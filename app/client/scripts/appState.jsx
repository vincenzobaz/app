
'use strict';

import {UserStore} from './stores/UserStore.jsx';
import {GameStore} from './stores/GameStore.jsx';
import {JoinRequestStore} from './stores/JoinRequestStore.jsx';
import {FriendStore} from './stores/FriendStore.jsx';

var debug = require('debug')('AppState');

export function getAppState() {
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

