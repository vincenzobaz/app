import {GameBoards} from "../../server/collections/GameBoards";
import {Game, RawGame} from "../models/Game";
import {RawTileState} from "../../server/collections/TileState";
import {RawGameBoard, GameBoard} from "../../common/models/GameBoard";
import * as ServerCollection from "../../server/collections/Game";


export const Games = new Mongo.Collection('games', {
  transform(doc: ServerCollection.RawGame) {
    const isPlayer1 = doc.player1 == Meteor.userId();
    let board: RawGameBoard = null;
    if (isPlayer1 && doc.player1Board) {
      board =  GameBoards.findOne(doc.player1Board._id, {transform: null}) as RawGameBoard;
    } else if (!isPlayer1 && doc.player2Board) {
      board = GameBoards.findOne(doc.player2Board._id, {transform: null}) as RawGameBoard;
    }

    const game: RawGame = {
      _id     : doc._id,
      player1 : doc.player1,
      player2 : doc.player2,
      board   : board,
      status  : doc.status,
      wonBy   : doc.wonBy,
      score   : {
        me   : computeScoreForPlayer(doc.boardState, isPlayer1 ? 1 : 2),
        them : computeScoreForPlayer(doc.boardState, isPlayer1 ? 2 : 1)
      },
      boardState   : doc.boardState,
      opponentId   : (isPlayer1) ? doc.player2 : doc.player1,
      playerTurn   : doc.playerTurn,
      creationTime : doc.creationTime
    };

    return Game.fromRaw(game);
  }
});

export function reduceScore(scores: RawTileState[]): number {
  return scores.reduce((acc, x) => acc + x.score, 0);
}


export function computeScoreForPlayer(board: RawTileState[][], player: number): number {
  return board.reduce((acc, row) => acc.concat(row), [])
      .filter((s: RawTileState) => s.player === player)
      .reduce((acc, s) => acc + s.score, 0);
}
