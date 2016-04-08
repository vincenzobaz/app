import {UserStore} from "./../stores/UserStore";
import {GameStatus, GAME_STATUS} from "./../../../common/models/GameStatus";
import {FriendStore} from "./../stores/FriendStore";
import {Score} from "../../../common/models/Score";
import {RawTileState} from "../../../server/collections/TileState";
import {GameBoard, RawGameBoard} from "../../../common/models/GameBoard";
import {Friend} from "../../../common/models/Friend";

export interface RawGame {
  _id: string | Mongo.ObjectID;
  player1: string | Mongo.ObjectID;
  player2: string | Mongo.ObjectID;
  board?: RawGameBoard;
  status: GameStatus;
  wonBy: number;
  score: Score;
  boardState: RawTileState[][];
  opponentId: string | Mongo.ObjectID;
  playerTurn: number;
  creationTime: Date;
}

export class Game {

  constructor(public _id: string | Mongo.ObjectID,
              public player1: string | Mongo.ObjectID,
              public player2: string | Mongo.ObjectID,
              public board: GameBoard,
              public status: GameStatus,
              public wonBy: number,
              public score: Score,
              public boardState: RawTileState[][],
              public opponentId: string | Mongo.ObjectID,
              public playerTurn: number,
              public creationTime: Date) {
  }


  get opponent(): Friend {
    const opId = this.opponentId;
    return FriendStore.byId(opId) || FriendStore.byUserId(opId);
  }

  get currentPlayerId() {
    return (this.playerTurn == 1) ? this.player1 : this.player2;
  }

  get currentPlayer() {
    return UserStore.byId(this.currentPlayerId);
  }

  get isMyTurnToPlay() {
    return this.currentPlayerId == Meteor.userId();
  }

  get myPlayerNumber() {
    return this.player1 == Meteor.userId() ? 1 : 2;
  }

  get hasEnded() {
    return this.status == GAME_STATUS.Ended;
  }

  get isPlaying() {
    return this.status == GAME_STATUS.Playing;
  }

  get isWaiting() {
    return this.status == GAME_STATUS.Waiting;
  }

  get isCreating() {
    return this.status == GAME_STATUS.Creating;
  }

  get isDraw() {
    return this.wonBy == 0;
  }

  get isWon() {
    if (this.isDraw) {
      return false;
    }

    return this.myPlayerNumber == this.wonBy;
  }

  get isLost() {
    if (this.isDraw) {
      return false;
    }

    return !this.isWon;
  }

  static fromRaw(raw: RawGame) {
    if (!raw) {
      return null;
    }
    return new Game(
        raw._id,
        raw.player1,
        raw.player2,
        GameBoard.fromRaw(raw.board),
        raw.status,
        raw.wonBy,
        raw.score,
        raw.boardState,
        raw.opponentId,
        raw.playerTurn,
        raw.creationTime
    );
  }

}



