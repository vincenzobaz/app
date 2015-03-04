
'use strict';

var GameStore = require('../stores/GameStore'),
    debug = require('debug')('RefreshGame'),
    scheduler = require('./OperationScheduler');

function RefreshGame(game, callback) {
  this.game     = game;
  this.callback = callback || function() {};

  // var strategy = new scheduler.BackgroundSchedule(
    // new scheduler.LinearSchedule(2 * 1000),
    // new scheduler.ExponentialBackoffSchedule(1000, 2)
  // );

  debug('new strategy');

  var strategy = new scheduler.LinearSchedule(2 * 1000);

  this.scheduler = new scheduler.OperationScheduler(
    this.loadGame.bind(this),
    strategy
  );
}

RefreshGame.prototype = {

  isRefreshingGame(game) {
    if (this.game == null) {
      return false;
    }

    debug('isRefreshing ' + game.getId(), game.getId() === this.game.getId());

    return game.getId() === this.game.getId();
  },

  loadGame() {
    this.loadCurrentGames();

    if (this.game == null) {
      return;
    }

    GameStore.load(this.game.gameId)
      .then(this.onGameLoad.bind(this));
  },

  loadCurrentGames() {
    GameStore.list();
  },

  onGameLoad(game) {
    var hasChanged = this.hasChanged(this.game, game);

    if (hasChanged) {
      this.scheduler.reset();
      this.callback(game);
    }
  },

  // TODO: Add better heuristics (or maybe a full diff?)
  hasChanged(prev, cur) {
    if (prev.token === cur.token) {
      debug('has not changed');
    }

    return prev.token !== cur.token;
  },

  start() {
    this.scheduler.start();
  },

  stop() {
    this.scheduler.stop();
  }

};

module.exports = RefreshGame;

