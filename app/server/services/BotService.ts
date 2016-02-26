import { Games } from "./../collections/Games";
import { GameStatus } from "./../../common/models/GameStatus";
import { JoinRequests } from "./../collections/JoinRequests";
import { JoinRequestService } from "./../services/JoinRequestService";
import { Kind } from "./../../common/models/questions/Kind";
import { BoardStateService } from "./BoardStateService";
import { MultipleChoiceAnswer, MultipleChoiceData } from "./verification/MultipleChoiceVerificationService";
import { AnswerService } from "./AnswerService";
import { Marker } from "./../../common/models/questions/Marker";
import { OrderItem } from "./verification/OrderItem";
import { OrderData } from "./verification/OrderData";
import { GeoData } from "./verification/GeoData";
import { TimelineData } from "./verification/TimelineData";
import User = Meteor.User;
import Question from "../../common/models/Question";
import {TimelineAnswer} from "./verification/TimelineAnswer";
import {GeoAnswer} from "./verification/GeoAnswer";
import {TimelineQuestion} from "../../common/models/questions/TimeLineQuestion";
import {OrderAnswer} from "./verification/OrderAnswer";
import {Tile, RawTile} from "../../common/models/Tile";
import {GameBoard} from "../../common/models/GameBoard";
import {RawTileState} from "../collections/TileState";
import {Game} from "../collections/Game";
import {entry, indexArray} from "../../common/helpers/indexedArray";


const BOT_USERNAME = 'bot';


export const BotService = {

  bot() {
    return BotService.getBot();
  },

  getBot(): User {
    if (!BotService.botCreated()) {
      this.createBot();
    }

    return Meteor.users.findOne({username: BOT_USERNAME});
  },

  isBot(userId) {
    return BotService.getBot()._id == userId;
  },

  botAsFriend() {
    const bot = this.getBot();
    return {
      id: bot._id,
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
              status: {$in: [GameStatus.Playing, GameStatus.Creating, GameStatus.Waiting]}
            }]
        });

    const handle = query.observe({
      added(game) {
        console.log(`Starting to observe game ${game._id}`);

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

  observeGame(gameId, botId) {
    const TIMEOUT = 3 * 1000;

    const query = Games.find(gameId);
    const game = Games.findOne(gameId);
    const botTurn = game.player1 === botId ? 1 : 2;
    const handle = query.observe({
      changed(newGame, oldGame) {
        if (newGame.playerTurn === botTurn) {
          //FIXME: find a better way
          //setTimeout(Meteor.bindEnvironment(() => {
          //  BotService.onGameChanged(newGame, handle);
          //}), TIMEOUT);
          setTimeout(() => {
            BotService.onGameChanged(newGame, handle);
          }, TIMEOUT);
        }
      }
    });
  },

  onGameChanged(game, handle) {
    if (game.status === GameStatus.Ended || game.status === GameStatus.Waiting) {
      return;
    }

    const result = BotService.playTurn(game);
    console.log("Results for bot turn:", result);

    BotService.drawBoardState(Games.findOne(game._id));

    if (result.win || result.draw) {
      handle.stop();
      console.log(`Game ended. Won: ${result.win}. Draw: ${result.draw}.`);
    }
  },

  playTurn(game) {
    if (game.getStatus() !== GameStatus.Playing) {
      return;
    }

    const player = game.getCurrentPlayer();
    const gameBoard = game.getCurrentBoard();
    const firstTurn = game.getCurrentPlayerAvailableMoves().length == 9;

    const method = (firstTurn) ? 'pickRandom' : 'pickTile';
    const tile: Tile = BotService[method](game, gameBoard);
    const successrate = 66;

    if (!tile) {
      throw new Meteor.Error(500, "Bot could't find a tile to play on.");
    }

    const answers = _.map(tile.questions, (q: Question) => {
      switch (q.kind) {
        case Kind.Timeline:
          return new TimelineAnswer(
              new TimelineData(_.random(0, 100) < successrate ? q.answer : (<TimelineQuestion>q).initialDate)
          );
        case Kind.MultipleChoice:
          return new MultipleChoiceAnswer(
              new MultipleChoiceData(_.random(0, 100) < successrate ? q.answer : q.answer + 1 % 4)
          );
        case Kind.Geolocation:
          const geoAnswer = new GeoAnswer(
              //new GeoData(new Marker(0, 0))
              new GeoData(_.random(0, 100) < successrate ? q.answer: new Marker(0, 0))
          );
          return geoAnswer;
        case Kind.Order:
          const correctOrder = new OrderData(
              [new OrderItem(q.answer[0], ""),
                new OrderItem(q.answer[1], ""),
                new OrderItem(q.answer[2], ""),
                new OrderItem(q.answer[3], "")
              ]);
          const incorrectOrder = new OrderData(
              [new OrderItem(0, ""),
                new OrderItem(0, ""),
                new OrderItem(0, ""),
                new OrderItem(0, "")
              ]);
          return new OrderAnswer(0, _.random(0, 100) < successrate ? correctOrder : incorrectOrder);
        default:
          throw new Meteor.Error(500, `Unknown Question Kind ${q.kind} for Bot`);
      }
    });

    return AnswerService.post(game._id, tile._id, answers);
  },

  pickTile(game, gameBoard) {
    const tiles = gameBoard.getTiles();
    const result = BotService.minmax(game, game.getPlayerTurn(), 0);

    if (result.move == null) {
      return null;
    }

    return tiles[result.move.row * 3 + result.move.column];
  },

  pickRandom(game: Game, gameBoard: GameBoard): Tile {
    const tiles = gameBoard.tiles;

    const indexTiles: entry<RawTileState>[] = indexArray(_.flatten(game.boardState));


    const potentialTiles = _.filter(indexTiles, function (t) {
      let state: RawTileState = t[1];
      return state.score < 3;
    });

    if (potentialTiles.length > 0) {
      return gameBoard.tiles[_.sample(potentialTiles)[0]];
    } else {
      throw new Meteor.Error("There are no tiles left to pick");
    }
  },

  minmax(game, player, depth) {
    const score = BotService.score(game.boardState, player, depth);
    if (score !== 0) {
      return {move: null, score: score};
    }
    depth += 1;
    var scores = [];
    var moves = [];

    const possibilities = BotService.getAvailableMoves(game, game.getPlayerTurn());
    if (_.isEmpty(possibilities)) {
      return {move: null, score: 0};
    }
    _.forEach(possibilities, m => {
      const updatedGame = game.createCopy();
      BotService.makeMove(updatedGame, m, game.getPlayerTurn());
      scores.push(BotService.minmax(updatedGame, player, depth).score);
      moves.push(m);
    });

    if (game.getPlayerTurn() === player) {
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
      return m.row !== move.row || m.column !== move.column
    });
    game.player2AvailableMoves = _.filter(game.player2AvailableMoves, m => {
      return m.row !== move.row || m.column !== move.column
    });
    game.boardState[move.row][move.column] = {player: player, score: 3};
    game.playerTurn = (player % 2) + 1;
  },

  score(boardState, currentPlayer, depth) {
    const boardStateService = new BoardStateService(boardState, currentPlayer);

    if (boardStateService.playerWins()) {
      return 10 - depth;
    }

    if (boardStateService.playerWins((currentPlayer % 2) + 1)) {
      return depth - 10;
    }

    return 0;
  },

  getAvailableMoves(game, currentPlayer) {
    if (currentPlayer == 1) {
      return game.getPlayer1AvailableMoves();
    } else {
      return game.getPlayer2AvailableMoves();
    }
  },

  drawBoardState(game) {
    const bs = game.boardState;
    for (var i = 0; i < bs.length; i++) {
      const line = _.map(bs[i], (s: RawTileState) => {
        if (s.player === 1) {
          return s.score === 0 ? '-' : "x";
        } else if (s.player === 2) {
          return s.score === 0 ? '-' : "o";
        } else {
          return " "
        }
      });
      console.log('|' + line.join('|') + '|');
    }
  }

};

