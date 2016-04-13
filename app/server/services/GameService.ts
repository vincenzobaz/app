import {Games} from './../collections/Games';
import {GameStatus, GAME_STATUS} from  './../../common/models/GameStatus';
import {Game} from "../collections/Game";
import {RawTileState} from "../collections/TileState";

export const GameService = {
  start(gameId) {
    console.log("starting game " + gameId);
    var game = Games.findOne(gameId);
    game.status = GAME_STATUS.Playing;
    Games.update(game._id, game);
    return {status: "success"};
  },

  createGame(player1Id, player2Id) {
    const boardState: RawTileState[][] = _.range(0, 3).map((i: number) => {
      return _.range(0, 3).map((j: number) => {
        return {player: 0, score: 0, player1Score: -1, player2Score: -1};
      });
    });

    return new Game(
        new Mongo.ObjectID(),
        player1Id,
        player2Id,
        null,
        null,
        GAME_STATUS.Waiting,
        1,
        0,
        0,
        boardState,
        GameService.createAvailableMoves(),
        GameService.createAvailableMoves(),
        null,
        new Date()
    );
  },

  createAvailableMoves() {
    var available = [];

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        available.push({row: i, column: j});
      }
    }
    return available;
  }
};
