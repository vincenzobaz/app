
'use strict';

var merge = require('lodash.merge');
var lazy = require('../helpers/lazy');
var User = require('./User');
var Tile = require('./Tile');

class Game {

  constructor(props) {
    merge(this, props);
  }

  getId() {
    return this.id || this.gameId;
  }

  getStatus() {
    return this.status;
  }

  getOpponent() {
    return lazy(this, 'opponent', opponent => new User(opponent));
  }

  isWaiting() {
    return this.waiting;
  }

  getScore() {
    return this.score;
  }

  getCurrentPlayer() {
    return lazy(this, 'currentPlayer', player => new User(player));
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

