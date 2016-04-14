import {Games} from "./../collections/Games";
import {GAME_STATUS} from "./../../common/models/GameStatus";
import {JoinRequests} from "./../collections/JoinRequests";
import {JoinRequestService} from "./../services/JoinRequestService";
import {KIND} from "./../../common/models/questions/common/Kind";
import {BoardStateService} from "./BoardStateService";
import {AnswerService} from "./AnswerService";
import {Marker} from "./../../common/models/questions/geolocation/Marker";
import Question from "../../common/models/Question";
import {TimelineQuestion} from "../../common/models/questions/timeline/TimeLineQuestion";
import {Tile} from "../../common/models/Tile";
import {GameBoard} from "../../common/models/GameBoard";
import {RawTileState} from "../collections/TileState";
import {Game} from "../collections/Game";
import {Entry, indexArray} from "../../common/helpers/indexedArray";
import * as _ from "lodash";
import User = Meteor.User;
import {TimelineData} from "../../common/models/questions/answers/TimelineData";
import {TimelineAnswer} from "../../common/models/questions/answers/TimelineAnswer";
import {MultipleChoiceData, MultipleChoiceAnswer} from "./verification/services/MultipleChoiceVerificationService";
import {GeoData} from "../../common/models/questions/answers/GeoData";
import {GeoAnswer} from "../../common/models/questions/answers/GeoAnswer";
import {OrderData} from "../../common/models/questions/answers/OrderData";
import {OrderAnswer} from "../../common/models/questions/answers/OrderAnswer";


const BOT_USERNAME = 'bot';


export const BotService = {

  bot(): User {
    return BotService.getBot();
  },

  getBot(): User {
    if (!BotService.botCreated()) {
      this.createBot();
    }

    return Meteor.users.findOne({username: BOT_USERNAME});
  },

  isBot(userId:string | Mongo.ObjectID) {
    return BotService.getBot()._id == userId;
  },

  botAsFriend() {
    const bot = this.getBot();
    return {
      _id: bot._id,
      name: bot.profile.name,
      isBot: true
    };
  },

  botCreated() {
    return Meteor.users.find({username: BOT_USERNAME}).count() > 0;
  },

  createBot(force = false) {
    if (force || !BotService.botCreated()) {
      console.log("Creating bot...");

      Accounts.createUser({
        username: BOT_USERNAME,
        email: "bot@reminisceme.com",
        password: "123456",
        profile: {
          name: "Anne Droid"
        }
      });
    }
  },

  observeGameCreation() {
    const bot = BotService.bot();
  
    const query = Games.find(
        {
          $and: [{
            $or: [{player1: bot._id}, {player2: bot._id}]
          },
            {
              status: {$in: [GAME_STATUS.Playing, GAME_STATUS.Creating, GAME_STATUS.Waiting]}
            }]
        });
  
    const handle = query.observe({
      added(game) {
        BotService.observeGame(game._id, bot._id);
  
        const request = JoinRequests.findOne({gameId: game._id});
        if (request) {
          JoinRequestService.accept(request._id);
          console.log(`Bot #1 accepted join request ${request._id}.`);
        }
      },
     
      removed(game) {
        console.log(`Game ${game._id} that bot #1 was playing has been removed.`);
      }
    });
  },

  observeGame(gameId: string | Mongo.ObjectID, botId: string | Mongo.ObjectID) {
    const TIMEOUT = 3 * 1000;
    const query = Games.find(gameId);
    const game = Games.findOne(gameId);
    const botTurn = game.player1 == botId ? 1 : 2;
    const handle = query.observe({
      changed(newGame, oldGame) {
        if (BotService.isBot(newGame.getCurrentPlayer())) {
          //FIXME: find a better way
          setTimeout(Meteor['bindEnvironment'](function() {
           BotService.onGameChanged(newGame, handle);
          }), TIMEOUT);
        }
      }
    });
  },

  onGameChanged(game: Game, handle?) {
    if (game.status == GAME_STATUS.Ended || game.status == GAME_STATUS.Waiting) {
      return;
    }
    
    const result = BotService.playTurn(game);
    
    if (handle && (result.win || result.draw)) {
      handle.stop();
      console.log(`Game ended. Won: ${result.win}. Draw: ${result.draw}.`);
    }
  },

  playTurn(game: Game) {
    console.log("Bot is playing");
    if (game.status != GAME_STATUS.Playing) {
      return;
    }

    const player = game.getCurrentPlayer;
    const gameBoard = game.getCurrentBoard();
    const firstTurn = game.getCurrentPlayerAvailableMoves().length == 9;

    const method = (firstTurn) ? 'pickRandom' : 'pickTile';
    const tile: Tile = BotService[method](game, gameBoard);
    const successrate = 33;

    if (!tile) {
      throw new Meteor.Error('500', "Bot could't find a tile to play on.");
    }
console.log("Bot answered: ", tile.type);
    const answers = _.map(tile.questions, (q: Question) => {
      switch (q.kind) {
        case KIND.Timeline:
          return new TimelineAnswer(
              new TimelineData(_.random(0, 100) < successrate ? q.answer : (<TimelineQuestion>q).initialDate)
          );
        case KIND.MultipleChoice:
          return new MultipleChoiceAnswer(
              new MultipleChoiceData(_.random(0, 100) < successrate ? q.answer : q.answer + 1 % 4)
          );
        case KIND.Geolocation:
          const geoAnswer = new GeoAnswer(
              //new GeoData(new Marker(0, 0))
              new GeoData(_.random(0, 100) < successrate ? q.answer: new Marker(0, 0))
          );
          return geoAnswer;
        case KIND.Order:
            const answers: number[] = q.answer;
          const correctOrder = new OrderAnswer(0, new OrderData(answers.map((id: number) => {return {id: id}}))) ; 
          const incorrectOrder = new OrderAnswer(0, new OrderData(answers.map((id: number) => {return {id: 1}}))) ;
          return _.random(0, 100) < successrate ? correctOrder : incorrectOrder;
        default:
          throw new Meteor.Error('500', `Unknown Question Kind ${q.kind} for Bot`);
      }
    });
    return AnswerService.post(game._id, tile._id, answers, game);
  },

  pickTile(game: Game, gameBoard: GameBoard) {
    const tiles = gameBoard.tiles;
    const result = BotService.minmax(game, game.playerTurn, 0);

    if (result.move == null) {
      return null;
    }

    return tiles[result.move.row * 3 + result.move.column];
  },

  pickRandom(game: Game, gameBoard: GameBoard): Tile {
    const tiles = gameBoard.tiles;

    const indexTiles: Entry<RawTileState>[] = indexArray(_.flatten(game.boardState));


    const potentialTiles = _.filter(indexTiles, function (t: Entry<RawTileState>) {
      let state: RawTileState = t.element;
      return state.score < 3;
    });

    if (potentialTiles.length > 0) {
      return gameBoard.tiles[_.sample(potentialTiles).index];
    } else {
      throw new Meteor.Error("There are no tiles left to pick");
    }
  },

  minmax(game: Game, player: number, depth: number) {
    const score = BotService.score(game.boardState, player, depth);
    if (score != 0) {
      return {move: null, score: score};
    }
    depth += 1;
    var scores = [];
    var moves = [];

    const possibilities = BotService.getAvailableMoves(game, game.playerTurn);
    // console.log("the possibilities", possibilities);
    if (possibilities.length == 0) {
      // console.log("We are done", moves);
      return {move: null, score: 0};
    }
    _.forEach(possibilities, m => {
      const updatedGame: Game = new Game(
          game._id,
          game.player1,
          game.player2,
          game.player1Board,
          game.player2Board, 
          game.status,
          game.playerTurn,
          game.player1Score,
          game.player1Score,
          BotService.highPerformanceArrayCloining(game.boardState) as RawTileState[][],
          game.player1AvailableMoves,
          game.player2AvailableMoves,
          game.wonBy, game.creationTime
      );

      BotService.makeMove(updatedGame, m, updatedGame.playerTurn);
      scores.push(BotService.minmax(updatedGame, player, depth).score);
      moves.push(m);
    });

    if (game.playerTurn == player) {
      const maxScoreIndex = _.indexOf(scores, _.max(scores));
      const move = moves[maxScoreIndex];
      return {move: move, score: scores[maxScoreIndex]}
    } else {
      const minScoreIndex = _.indexOf(scores, _.min(scores));
      const move = moves[minScoreIndex];
      return {move: move, score: scores[minScoreIndex]}
    }
  },
  makeMove(game: Game, move: RawAvailableMove, player: number) {
    game.player1AvailableMoves = _.filter(game.player1AvailableMoves, m => {
      return m.row != move.row || m.column != move.column
    });
    game.player2AvailableMoves = _.filter(game.player2AvailableMoves, m => {
      return m.row != move.row || m.column != move.column
    });
    game.boardState[move.row][move.column] = {player: player, score: 3};
    game.playerTurn = (player % 2) + 1;
  },

  score(boardState: RawTileState[][], currentPlayer, depth) {
    const boardStateService = new BoardStateService(boardState, currentPlayer);
    
    if (boardStateService.playerWins()) {
      return 10 - depth;
    }

    if (boardStateService.playerWins((currentPlayer % 2) + 1)) {
      return depth - 10;
    }

    return 0;
  },

  getAvailableMoves(game: Game, currentPlayer: number) {
    if (currentPlayer == 1) {
      return game.player1AvailableMoves;
    } else {
      return game.player2AvailableMoves;
    }
  },

  drawBoardState(game: Game) {
    const bs = game.boardState;
    for (var i = 0; i < bs.length; i++) {
      const line = _.map(bs[i], (s: RawTileState) => {
        if (s.player == 1) {
          return s.score == 0 ? '-' : "x";
        } else if (s.player == 2) {
          return s.score == 0 ? '-' : "o";
        } else {
          return " "
        }
      });
      console.log('|' + line.join('|') + '|');
    }
  },

  highPerformanceArrayCloining(existingArray)  {
    var newObj = (existingArray instanceof Array) ? [] : {};
    for (var i in existingArray) {
      if (i == 'clone') continue;
      if (existingArray[i] && typeof existingArray[i] == "object") {
        newObj[i] = BotService.highPerformanceArrayCloining(existingArray[i]);
      } else {
        newObj[i] = existingArray[i]
      }
    }
    return newObj;
  }


};

