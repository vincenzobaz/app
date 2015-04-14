
'use strict';

var UserStore = require('./stores/UserStore');
var JoinRequestStore = require('./stores/JoinRequestStore');
var GameStore = require('./stores/GameStore');

module.exports = function getAppState() {
  return {
    isLoggedIn: UserStore.isLoggedIn() || false,
    user: UserStore.current() || null,
    currentGameId: GameStore.currentId() || null,
    currentGame: GameStore.current() || null,
    games: GameStore.list(),
    joinRequests: JoinRequestStore.list()
  };
};

