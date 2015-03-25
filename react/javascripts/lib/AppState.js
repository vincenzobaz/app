
'use strict';

var UserStore = require('./stores/UserStore');
var JoinRequestStore = require('./stores/JoinRequestStore');
var GameStore = require('./stores/GameStore');

module.exports = function getAppState() {
  return {
    isLoggedIn: UserStore.isLoggedIn() || false,
    fbInited: Session.get('fbInited') || false,
    user: UserStore.current() || null,
    currentGameId: Session.get('currentGameId') || null,
    currentGame: Session.get('currentGame') || null,
    games: GameStore.list(),
    joinRequests: JoinRequestStore.list()
  };
};

