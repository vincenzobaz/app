
'use strict';

var merge = require('lodash.merge');
var lazy = require('../helpers/lazy');
var User = require('./User');
var Tile = require('./Tile');
var UserStore = require('../stores/UserStore');

class Game {

  constructor(props) {
    merge(this, props);
  }

  getId() {
    return this._id;
  }

  getStatus() {
    return this._status;
  }

  getOpponent() {
    var myId = Meteor.userId();
    var playerId = (this._player1 === myId) ? this._player2 : this._player1;
    return UserStore.byId(playerId);
  }

  isWaiting() {
    return this.waiting;
  }

  getScore() {
    return this.score;
  }

  getCurrentPlayer() {
    var currentPlayer = (this._playerTurn === 1) ? this._player1 : this._player2;
    return UserStore.byId(currentPlayer);
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
        new Tile(tile)));
  }

}

module.exports = Game;

