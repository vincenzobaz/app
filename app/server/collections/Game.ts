import {GameBoard, RawGameBoard} from "../../common/models/GameBoard";
import {GameStatus} from "../../common/models/GameStatus";
import {RawTileState} from "./TileState";


export interface RawGame {
  _id: string | Mongo.ObjectID;
  player1: string | Mongo.ObjectID;
  player2: string | Mongo.ObjectID;
  player1Board: RawGameBoard;
  player2Board: RawGameBoard;
  status: GameStatus;
  playerTurn: number;
  player1Score: number;
  player2Score: number;
  boardState: RawTileState[][];
  player1AvailableMoves: RawAvailableMove[];
  player2AvailableMoves: RawAvailableMove[];
  wonBy: number;
  creationTime: Date;
}

export class Game {


  constructor(public _id: string |  Mongo.ObjectID,
              public player1: string | Mongo.ObjectID,
              public player2: string | Mongo.ObjectID,
              public player1Board: GameBoard,
              public player2Board: GameBoard,
              public status: GameStatus,
              public playerTurn: number,
              public player1Score: number,
              public player2Score: number,
              public boardState: RawTileState[][],
              public player1AvailableMoves: RawAvailableMove[],
              public player2AvailableMoves: RawAvailableMove[],
              public wonBy: number,
              public creationTime: Date) {

  }


  getCurrentBoard(): GameBoard {
    return this.getPlayerBoard(this.playerTurn);
  }


  nextTurn() {
    this.playerTurn = this.playerTurn == 1 ? 2 : 1;
  }

  getCurrentPlayer(): string | Mongo.ObjectID {
    if (this.playerTurn === 1) {
      return this.player1;
    }
    return this.player2;
  }


  incrementCurrentPlayerScore(value) {
    this['player' + this.playerTurn + 'Scores'] += value;
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
        raw.boardState,
        raw.player1AvailableMoves,
        raw.player2AvailableMoves,
        raw.wonBy,
        raw.creationTime
    );
  }
  


}
