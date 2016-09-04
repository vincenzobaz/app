
import { UserStore }        from './stores/UserStore';
import { GameStore }        from './stores/GameStore';
import { FriendStore }      from './stores/FriendStore';
import { JoinRequestStore } from './stores/JoinRequestStore';

import { User }             from './models/User';
import { Game }             from './models/Game';
import { Friend }           from '../common/models/Friend';
import { JoinRequest }      from './models/JoinRequest';

export interface AppState {
  isLoggedIn   : boolean;
  user         : User;
  games        : Game[];
  friends      : Friend[];
  joinRequests : JoinRequest[];
  lastGameId   : string;
}

export function getAppState(): AppState {
  return {
    isLoggedIn   : UserStore.isLoggedIn()  || false,
    user         : UserStore.current()     || null,
    games        : GameStore.list()        || [],
    friends      : FriendStore.list()      || [],
    joinRequests : JoinRequestStore.list() || [],
    lastGameId   : Session.get("lastGameId")
  };
}

