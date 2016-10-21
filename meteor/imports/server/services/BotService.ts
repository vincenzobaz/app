
import {Games} from "../collections/Games";
import {GAME_STATUS, GameStatus} from "../../common/models/GameStatus";
import {JoinRequests} from "../collections/JoinRequests";
import {JoinRequestService} from "../services/JoinRequestService";
import {GameService} from "../services/GameService";
import {KIND} from "../../common/models/questions/common/Kind";
import {BoardStateService} from "./BoardStateService";
import {AnswerService} from "./AnswerService";
import {Marker} from "../../common/models/questions/geolocation/Marker";
import Question from "../../common/models/Question";
import {TimelineQuestion} from "../../common/models/questions/timeline/TimelineQuestion";
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
import {GeoAnswer} from "../../common/models/questions/answers/GeoAnswer";
import {OrderData} from "../../common/models/questions/answers/OrderData";
import {OrderAnswer} from "../../common/models/questions/answers/OrderAnswer";
import {Location} from "../../common/models/questions/geolocation/Location";

interface RawAvailableMove {
  row: number;
  column: number;
}

function cloneArray(existingArray: any): any {
  var newObj = (existingArray instanceof Array) ? [] : {};
  for (var i in existingArray) {
    if (i == 'clone') continue;
    if (existingArray[i] && typeof existingArray[i] == "object") {
      newObj[i] = cloneArray(existingArray[i]);
    } else {
      newObj[i] = existingArray[i]
    }
  }
  return newObj;
}

export const BOT_USERNAME = 'bot';

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

  isBot(userId: string) {
    return BotService.getBot()._id.valueOf() == userId;
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
      logger.debug("Creating bot...");

      Meteor.users.insert({
        username: BOT_USERNAME,
        emails: [{address: "bot@reminisceme.com", verified: true}],
        profile: {
          name: "Anne Droid"
        }
      });
    }
  },

  createBotGame(userFbId: string) {
    const bot  = BotService.bot();
    const game = GameService.createGame(userFbId, bot._id, true);

    Games.insert(game);
    GameService.fetchBoards(game);

    return {
      status: 'success',
      gameId: game._id
    };
  },

  observeGames() {
    const bot   = BotService.bot();
    const botId = bot._id.valueOf();
    const query = GameService.findBotGames();

    query.observe({
      added(game: Game) {
        logger.debug(`Starting to watch bot game.`, {game_id: game._id});
        BotService.observeGame(game._id);
      },

      removed(game: Game) {
        logger.debug(`Game that bot was playing has been removed.`, {game_id: game._id});
        BotService.proposeGameToPlayerIfNecessary(game.player1);
      }
    });
  },

  observeGame(gameId: string | Mongo.ObjectID) {
    logger.debug(`Observing game`, {gameId: gameId});

    const TIMEOUT = 3 * 1000;
    const query   = Games.find(gameId);
    const game    = Games.findOne(gameId);

    if (!game) {
      logger.error(`BotService.observeGame: Cannot find game`, {gameId: gameId});
      return;
    }

    const bot     = BotService.bot();
    const botId   = bot._id.valueOf();
    const botTurn = (game.player1 == botId) ? 1 : 2;

    const handle = query.observe({
      changed(newGame: Game, oldGame: Game) {
        if (BotService.isBot(newGame.getCurrentPlayer())) {
          //FIXME: find a better way
          setTimeout(Meteor['bindEnvironment'](function () {
            BotService.onGameChanged(newGame, handle);
          }), TIMEOUT);
        }
      }
    });
  },

  onGameChanged(game: Game, handle?) {
    if (game.status == GAME_STATUS.Waiting) {
      return;
    }

    if (handle && game.status == GAME_STATUS.Ended) {
      handle.stop();
      BotService.proposeGameToPlayerIfNecessary(game.player2);
    }

    BotService.playTurn(game);
  },

  playTurn(game: Game) {
    logger.debug("Bot is playing", {game_id: game._id});
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
    logger.debug("Bot answered: ", tile.type, {gameId: game._id});
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
          const geoAnswer = _.random(0, 100) < successrate ?
            new GeoAnswer(q.answer) :
            new GeoAnswer(new Location(0, 0));
          return geoAnswer;
        case KIND.Order:
          const answers: number[] = q.answer;
          const correctOrder = new OrderAnswer(0, new OrderData(answers.map((id: number) => {
            return {id: id}
          })));
          const incorrectOrder = new OrderAnswer(0, new OrderData(answers.map((id: number) => {
            return {id: 1}
          })));
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

    if (possibilities.length == 0) {
      return {move: null, score: 0};
    }

    possibilities.forEach(m => {
      const updatedGame = Game.fromRaw({
        _id: game._id,
        player1: game.player1,
        player2: game.player2,
        player1Board: game.player1Board,
        player2Board: game.player2Board,
        status: game.status,
        playerTurn: game.playerTurn,
        player1Score: game.player1Score,
        player2Score: game.player2Score,
        player1TileScores: game.player1TileScores,
        player2TileScores: game.player2TileScores,
        boardState: cloneArray(game.boardState) as RawTileState[][],
        player1AvailableMoves: game.player1AvailableMoves,
        player2AvailableMoves: game.player2AvailableMoves,
        wonBy: game.wonBy,
        creationTime: game.creationTime,
        isBotGame: game.isBotGame
      });

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

    if (!_.isEmpty(boardStateService.playerWins())) {
      return 10 - depth;
    }

    if (!_.isEmpty(boardStateService.playerWins((currentPlayer % 2) + 1))) {
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
      logger.debug('|' + line.join('|') + '|');
    }
  },

  proposeGameToPlayerIfNecessary(userFbId: string) {
    const botId = BotService.getBot()._id.valueOf();
    const botRequestCount = JoinRequests.find({
        from: botId,
        to: userFbId
      }
    ).count();
    const botGamesCount = Games.find({
      $and: [{
        $or: [
          {
            player1: userFbId,
            player2: botId
          }, {
            player1: botId,
            player2: userFbId
          }]
      },
        {status: {$nin: [GAME_STATUS.Ended, GAME_STATUS.Failed, GAME_STATUS.Waiting]}}]
    }).count();

    logger.info(`We have ${botRequestCount} botrequests and ${botGamesCount} botgames`);

    if (botRequestCount == 0 && botGamesCount == 0) {
      JoinRequestService.send(botId, userFbId, _.uniqueId());
    }
  }

};

