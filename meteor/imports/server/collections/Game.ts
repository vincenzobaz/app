import {GameBoard, RawGameBoard} from "../../common/models/GameBoard";
import {GameStatus} from "../../common/models/GameStatus";
import {RawTileState} from "./TileState";
import * as _ from 'lodash';

interface TileScore {
  questionId: string;
  score: number;
}

interface TileScores {
  [key: string]: TileScore[];
}

interface RawAvailableMove {
  row: number;
  column: number;
}

export interface RawGame {
  _id: string | Mongo.ObjectID;
  player1: string;
  player2: string;
  player1Board: RawGameBoard;
  player2Board: RawGameBoard;
  status: GameStatus;
  playerTurn: number;
  player1Score: number;
  player2Score: number;
  player1TileScores: TileScores,
  player2TileScores: TileScores,
  boardState: RawTileState[][];
  player1AvailableMoves: RawAvailableMove[];
  player2AvailableMoves: RawAvailableMove[];
  wonBy: number;
  creationTime: Date;
  isBotGame: boolean;
}

export class Game {

  constructor(
    public _id: string |  Mongo.ObjectID,
    public player1: string,
    public player2: string,
    public player1Board: GameBoard,
    public player2Board: GameBoard,
    public status: GameStatus,
    public playerTurn: number,
    public player1Score: number,
    public player2Score: number,
    public player1TileScores: TileScores,
    public player2TileScores: TileScores,
    public boardState: RawTileState[][],
    public player1AvailableMoves: RawAvailableMove[],
    public player2AvailableMoves: RawAvailableMove[],
    public wonBy: number,
    public creationTime: Date,
    public isBotGame: boolean
  ) {
      if (typeof this.player1TileScores !== 'object') {
        this.player1TileScores = {};
      }

      if (typeof this.player1TileScores !== 'object') {
        this.player1TileScores = {};
      }
  }

  getCurrentBoard(): GameBoard {
    return this.getPlayerBoard(this.playerTurn);
  }

  nextTurn() {
    this.playerTurn = this.playerTurn == 1 ? 2 : 1;
  }

  getCurrentPlayer(): string {
    if (this.playerTurn === 1) {
      return this.player1;
    }
    else if (this.playerTurn === 2) {
      return this.player2;
    }
  }

  setCurrentPlayerTileScores(tileId: string | Mongo.ObjectID, scores: TileScore[]): void {
    const key= <string>tileId.valueOf();

    if (this.playerTurn === 1) {
      this.player1TileScores[key] = scores;
    }
    else if (this.playerTurn === 2) {
      this.player2TileScores[key] = scores;
    }
  }

  incrementCurrentPlayerScore(value: number) {
    if (this.playerTurn === 1) {
      this.player1Score += value;
    } else if (this.playerTurn === 2) {
      this.player2Score += value;
    }
  }

  getOpponent() {
    var myId = Meteor.userId();

    if (this.player1 === myId) {
      return this.player2;
    }
    return this.player1;
  }

  getOpponentForUser(userId) {
    if (this.player1 === userId) {
      return this.player2;
    }
    return this.player1;
  }

  getCurrentPlayerAvailableMoves(): RawAvailableMove[] {
    if (this.playerTurn == 1) {
      return this.player1AvailableMoves;
    } else {
      return this.player2AvailableMoves;
    }
  }

  setCurrentPlayerAvailableMoves(value: RawAvailableMove[]) {
    this['player' + this.playerTurn + 'AvailableMoves'] = value;
  }

  removeCurrentPlayerAvailableMove(move) {
    this.setCurrentPlayerAvailableMoves(
        _.filter(this.getCurrentPlayerAvailableMoves(), m => {
          return m.row !== move.row || m.column !== move.column
        })
    );
  }

  getPlayerBoard(playerNum: number): GameBoard {
    switch (playerNum) {
      case 1:
        return this.player1Board;
      case 2:
        return this.player2Board;
      default:
        throw new Meteor.Error(`The requested board can't be found as playerNum ${playerNum} is outside of range [1-2]`);
    }
  }

  isDraw(): boolean {
    return this.wonBy === 0;
  }

  static fromRaw(raw: RawGame): Game {
    return new Game(
        raw._id,
        raw.player1,
        raw.player2,
        GameBoard.fromRaw(raw.player1Board),
        GameBoard.fromRaw(raw.player2Board),
        raw.status,
        raw.playerTurn,
        raw.player1Score,
        raw.player2Score,
        raw.player1TileScores,
        raw.player2TileScores,
        raw.boardState,
        raw.player1AvailableMoves,
        raw.player2AvailableMoves,
        raw.wonBy,
        raw.creationTime,
        raw.isBotGame
    );
  }

}
