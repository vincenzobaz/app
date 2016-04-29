    
'use strict';

import {UserStore} from './stores/UserStore';
import {GameStore} from './stores/GameStore';
import {JoinRequestStore} from './stores/JoinRequestStore';
import {FriendStore} from './stores/FriendStore';

var debug = require('debug')('AppState');

export function getAppState() {
  return {
    isLoggedIn: UserStore.isLoggedIn() || false,
    page: Session.get('page') || 'home',
    user: UserStore.current() || null,
    currentGame: GameStore.current() || null,
    games: GameStore.list() || [],
    joinRequests: JoinRequestStore.list() || [],
    friends: FriendStore.list() || []
  };
}

