
'use strict';

var UserStore = require('./stores/UserStore');
var JoinRequestStore = require('./stores/JoinRequestStore');
var GameStore = require('./stores/GameStore');
var FriendStore = require('./stores/FriendStore');
var debug = require('debug')('AppState');

module.exports = function getAppState() {
  debug('AppState refresh');
  return {
    isLoggedIn: UserStore.isLoggedIn() || false,
    page: Session.get('page') || 'home',
    user: UserStore.current() || null,
    currentGame: GameStore.current() || null,
    games: GameStore.list() || [],
    joinRequests: JoinRequestStore.list() || [],
    friends: FriendStore.list() || []
  };
};

