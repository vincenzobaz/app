
'use strict';

var UserStore = require('./stores/UserStore');
var JoinRequestStore = require('./stores/JoinRequestStore');
var GameStore = require('./stores/GameStore');

module.exports = function getAppState() {
  return {
    user: UserStore.current(),
    currentGame: null,
    games: GameStore.list(),
    joinRequests: JoinRequestStore.list()
  };
};

