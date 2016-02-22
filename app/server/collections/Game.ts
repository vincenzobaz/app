import ObjectID = Mongo.ObjectID;
import { GameBoard } from "../../common/models/GameBoard";
import { GameStatus } from "../../common/models/GameStatus";
import { RawTileState } from "./TileState";


export interface RawGame {
  _id: ObjectID;
  player1: string;
  player2: string;
  player1Board: GameBoard;
  player2Board: GameBoard;
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

  private _playerTurn: number;

  constructor(public _id: ObjectID,
              public player1: string,
              public player2: string,
              public player1Board: GameBoard,
              public player2Board: GameBoard,
              public status: GameStatus,
              playerTurn: number,
              public player1Score: number,
              public player2Score: number,
              public boardState: RawTileState[][],
              public player1AvailableMoves: RawAvailableMove[],
              public player2AvailableMoves: RawAvailableMove[],
              public wonBy: number,
              public creationTime: Date) {
    
    this._playerTurn = playerTurn;
  }


  get playerTurn() {
    return this._playerTurn;
  }


  set playerTurn(value) {
    if (value < 1 || value > 2) {
      throw new Meteor.Error("There can only be 2 players per game, turn value " + value);
    }
    this._playerTurn = value;
  }
  
  getCurrentBoard() {
    return this[`getPlayer${this.playerTurn}Board`]();
  }



  nextTurn() {
    this.playerTurn = this.playerTurn === 1 ? 2 : 1;
  }

  getCurrentPlayer() {
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


  static fromRaw(raw: RawGame): Game {
    return new Game(
        raw._id,
        raw.player1,
        raw.player2,
        raw.player1Board,
        raw.player2Board,
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
