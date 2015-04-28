
Reminisce.Model.Game = class Game {

  constructor(props) {
    _.extend(this, props);
  }

  getId() {
    return this._id;
  }

  getStatus() {
    return this.status;
  }

  getOpponent() {
    var myId = Meteor.userId();
    var playerId = (this.player1 === myId) ? this.player2 : this.player1;
    return Reminisce.Store.UserStore.byId(playerId);
  }

  isWaiting() {
    return this.waiting;
  }

  getScore() {
    return this.score;
  }

  getCurrentPlayer() {
    var currentPlayer = (this.playerTurn === 1) ? this.player1 : this.player2;
    return Reminisce.Store.UserStore.byId(currentPlayer);
  }

  hasEnded() {
    return this.getStatus() === 'ended';
  }

  canPlay() {
    debug('canPlay() is not implemented');
    return true;
  }

  isPlaying() {
    return this.getStatus() === 'playing';
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
    console.log('Game', doc);
    return new Reminisce.Model.Game(doc);
  }
});

