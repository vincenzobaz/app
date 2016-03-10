

import {NamespacedSession} from './../boot/helpers/NamespacedSession';

import {JoinRequestStore} from './JoinRequestStore';
import {FriendStore} from './FriendStore';
import {Friend} from "../../../common/models/Friend";
import {MeteorPromise} from "./../boot/helpers/meteor";
import {Game} from "../models/Game";
import {Games} from "../collections/Games";



const GameSession = NamespacedSession('GameStore');



export module GameStore {

  export function current() {
    const gameId = GameSession.get('currentId');
    if (gameId == null) {
      return null;
    }
    return this.load(gameId);
  }

  export function list() {
    return Games
            .find({}, { sort: { creationTime: -1 } })
            .fetch()
  }

  export function start(friendId) {
    return JoinRequestStore.send(friendId);
  }

  export function startBotGame() {
    const bot: Friend = FriendStore.bot();
    return JoinRequestStore.send(bot._id);
  }

  export function load(gameId) {
    return Games.findOne(gameId)
  }

  export function quit(game: Game) {
    MeteorPromise.call('Game.quit', game._id, () => {
      GameSession.set('currentId', null);
      Session.set('page', 'home');
    });
  }

  export function switchTo(game: Game | Mongo.ObjectID | string, isId = true) {
    if (isId) {
      GameSession.set('currentId', game);
    }
    else {
      GameSession.set('currentId', (<Game>game)._id);
    }

    Session.set('page', 'game');
  }
  
  export function byId(gameId: Mongo.ObjectID | string): Game | {} {
    return Games.findOne(gameId);
  }

}
