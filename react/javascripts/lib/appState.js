
'use strict';

var UserStore = require('./stores/UserStore');
var JoinRequestStore = require('./stores/JoinRequestStore');
var GameStore = require('./stores/GameStore');
var debug = require('debug')('AppState');

module.exports = function getAppState() {
  debug('AppState refresh');
  debug(GameStore.current());
  return {
    isLoggedIn: UserStore.isLoggedIn() || false,
    user: UserStore.current() || null,
    currentGame: GameStore.current() || null,
    games: GameStore.list() || [],
    joinRequests: JoinRequestStore.list() || []
  };
};

