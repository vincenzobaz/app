
Reminisce.Model.Game = class Game {

  constructor(props) {
    _.extend(this, props);

    // FIXME: This kind of stuff should be (cleanly) done on the server.
    this.opponentId = (this.player1 === Meteor.userId()) ? this.player2 : this.player1;
    this.board      = (this.player1 === Meteor.userId()) ? this.player1Board : this.player2Board;
  }

  getId() {
    return this._id;
  }

  getStatus() {
    return this.status;
  }

  getOpponentId() {
    return this.opponentId;
  }

  getOpponent() {
    return Reminisce.Store.UserStore.byId(this.getOpponentId());
  }

  // FIXME: This kind of stuff should be (cleanly) done on the server.
  getScore() {
    return {
      me:   (this.player1 === Meteor.userId() ? this.player1Scores : this.player2Scores)|0,
      them: (this.player2 === Meteor.userId() ? this.player1Scores : this.player2Scores)|0
    };
  }

  getCurrentPlayerId() {
    return (this.playerTurn === 1) ? this.player1 : this.player2;
  }

  getCurrentPlayer() {
    return Reminisce.Store.UserStore.byId(this.getCurrentPlayerId());
  }

  isMyTurnToPlay() {
    return this.getCurrentPlayerId() === Meteor.userId();
  }

  hasEnded() {
    return this.getStatus() === 'ended';
  }

  isPlaying() {
    return this.getStatus() === 'playing';
  }

  isWaiting() {
    return this.getStatus() === 'waiting';
  }

  isCreating() {
    return ['creating', 'init'].indexOf(this.getStatus()) > -1;
  }

  isWon() {
    var winData = this.getWinData();
    return winData != null && winData.wonBy != null;
  }

  getWinData() {
    return this.winData;
  }

  getBoard() {
    return lazy(this.getId(), this, 'board', boardId => {
      const board = Reminisce.Collection.GameBoards.findOne(boardId);
      return new Reminisce.Model.GameBoard(board);
    })
  }

}

Reminisce.Collection.Games = new Mongo.Collection('games', {
  transform(doc) {
    return new Reminisce.Model.Game(doc);
  }
});

