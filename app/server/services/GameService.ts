import {Games} from './../collections/Games';
import {GameStatus} from  './../../common/models/GameStatus';
import { Game } from "../collections/Game";
import { RawTileState } from "../collections/TileState";

export const GameService = {
    start(gameId) {
        console.log("starting game " + gameId);
        var game = Games.findOne(gameId);
        game.status = GameStatus.Playing;
        Game.save(game);
        return {status: "success"};
    },

    createGame(player1Id, player2Id) {
        const boardState: RawTileState[][] = [
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}],
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}],
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}]
        ];

        return new Game(
            new Mongo.ObjectID(),
            player1Id,
            player2Id,
            null,
            null,
            GameStatus.Waiting,
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

        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                available.push({row: i, column: j});
            }
        }
        return available;
    }
};
