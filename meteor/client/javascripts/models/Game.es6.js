
Reminisce.Model.Game = class Game {

  constructor(props) {
    _.extend(this, props);

    this.opponentId = (this.player1 === Meteor.userId()) ? this.player2 : this.player1;
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

  getScore() {
    return {
      me: 0,
      them: 0
    };
    // return this.score;
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

  getTiles() {
    return lazy(this, 'tiles', tiles =>
      tiles.map(tile =>
        new Reminisce.Model.Tile(tile)));
  }

}

Reminisce.Collection.Games = new Mongo.Collection("games", {
  transform(doc) {
    return new Reminisce.Model.Game(doc);
  }
});

