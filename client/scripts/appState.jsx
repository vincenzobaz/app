
'use strict';

var debug = require('debug')('AppState');

Reminisce.getAppState = function getAppState() {
  debug('AppState refresh');
  return {
    isLoggedIn: UserStore.isLoggedIn() || false,
    page: Session.get('page') || 'home',
    user: R.Store.UserStore.current() || null,
    currentGame: R.Store.GameStore.current() || null,
    games: R.Store.GameStore.list() || [],
    joinRequests: R.Store.JoinRequestStore.list() || [],
    friends: R.Store.FriendStore.list() || []
  };
};

