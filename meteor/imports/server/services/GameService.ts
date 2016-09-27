
import { Server }                  from '../server';
import { Games }                   from '../collections/Games';
import { GameStatus, GAME_STATUS } from '../../common/models/GameStatus';
import { Game }                    from '../collections/Game';
import { RawTileState }            from '../collections/TileState';

import * as _                      from 'lodash';

export const GameService = {

  start(gameId) {
    const game = Games.findOne(gameId);
    game.status = GAME_STATUS.Playing;

    Games.update(game._id, game);

    return {
      status: "success"
    };
  },

  createBoardState(): RawTileState[][] {
    return _.range(0, 3).map(i => {
      return _.range(0, 3).map(j => {
        return {
          player: 0,
          score: 0,
          player1Score: -1,
          player2Score: -1
        };
      });
    });
  },

  createGame(player1Id, player2Id, isBotGame: boolean = false) {
    return Game.fromRaw({
        _id: new Mongo.ObjectID(),
        player1: player1Id,
        player2: player2Id,
        player1Board: null,
        player2Board: null,
        status: GAME_STATUS.Waiting,
        playerTurn: 1,
        player1Score: 0,
        player2Score: 0,
        player1TileScores: {},
        player2TileScores: {},
        boardState: this.createBoardState(),
        player1AvailableMoves: GameService.createAvailableMoves(),
        player2AvailableMoves: GameService.createAvailableMoves(),
        wonBy: null,
        creationTime: new Date(),
        isBotGame: isBotGame
    });
  },

  createAvailableMoves() {
    var available = [];

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        available.push({row: i, column: j});
      }
    }
    return available;
  },

  fetchBoards(game: Game) {
    Server.fetchGameBoard(game.player1, game._id, 1);
    Server.fetchGameBoard(game.player2, game._id, 2);
  },

  findBotGames() {
    return Games.find({
      $and: [
        { isBotGame: true },
        {
          status: {
            $in: [
              GAME_STATUS.Playing,
              GAME_STATUS.Creating,
              GAME_STATUS.Waiting
            ]
          }
        }
      ]
    });
  }

};

