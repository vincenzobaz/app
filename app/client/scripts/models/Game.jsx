
import {GameBoards} from './GameBoards.jsx';
import {UserStore} from './../stores/UserStore.jsx';
import {GameStatus} from './../../../common/models/GameStatus.jsx';
import {FriendStore} from './../stores/FriendStore.jsx';

const reduceScore = (scores) =>
    scores.reduce((acc, x) => acc + x.score, 0);

const computeScoreForPlayer = (board, player) =>
  board.reduce((acc, row) => acc.concat(row), [])
  .filter(s => s.player === player)
  .reduce((acc, s) => acc + s.score, 0);

export const Games = new Mongo.Collection('games', {
    transform(doc) {
        const isPlayer1 = doc.player1 === Meteor.userId();
        const boardId   = (isPlayer1) ? doc.player1Board : doc.player2Board;
        const board     = GameBoards.findOne(boardId);

        const game = {
            _id     : doc._id,
            player1 : doc.player1,
            player2 : doc.player2,
            status  : doc.status,
            wonBy   : doc.wonBy,
            score   : {
                me   : computeScoreForPlayer(doc.boardState, isPlayer1 ? 1 : 2),
                them : computeScoreForPlayer(doc.boardState, isPlayer1 ? 2 : 1)
            },
            boardState   : doc.boardState,
            board        : board,
            opponentId   : (isPlayer1) ? doc.player2 : doc.player1,
            playerTurn   : doc.playerTurn,
            creationTime : doc.creationTime
        };

        return new Game(game);
    }
});

export class Game {

  constructor(props) {
    _.extend(this, props);
  }

  getId() {
    return this._id;
  }

  getStatus() {
    return this.status.toLowerCase();
  }

  getOpponentId() {
    return this.opponentId;
  }

  getOpponent() {
    const opId = this.getOpponentId();

    if (opId == Meteor.userId()) {
        return UserStore.byId(opId);
    }

    return FriendStore.byId(opId) || FriendStore.byUserId(opId);
  }

  getScore() {
    return this.score;
  }

  getCurrentPlayerId() {
    return (this.playerTurn === 1) ? this.player1 : this.player2;
  }

  getCurrentPlayer() {
    return UserStore.byId(this.getCurrentPlayerId());
  }

  isMyTurnToPlay() {
    return this.getCurrentPlayerId() === Meteor.userId();
  }

  getMyPlayerNumber() {
    return this.player1 === Meteor.userId() ? 1 : 2;
  }

  hasEnded() {
    return (
        this.getStatus() === GameStatus.Ended ||
        this.getStatus() === GameStatus.Finished
    );
  }

  isPlaying() {
    return this.getStatus() === GameStatus.Playing;
  }

  isWaiting() {
    return this.getStatus() === GameStatus.Waiting;
  }

  isCreating() {
    return this.getStatus() === GameStatus.Creating;
  }

  isDraw() {
    return this.wonBy === 0;
  }

  isWon() {
    if (this.isDraw()) {
        return false;
    }

    return this.getMyPlayerNumber() === this.wonBy;
  }

  isLost() {
    return !this.isWon();
  }

  getBoard() {
    return this.board;
  }

  getBoardState() {
    return this.boardState;
  }

  getCreationTime() {
    return this.creationTime;
  }

}



