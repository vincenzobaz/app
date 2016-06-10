
import { browserHistory }     from 'react-router';
import { Option, Some, None } from 'option-t';

import { JoinRequestStore } from './JoinRequestStore';
import { FriendStore }      from './FriendStore';
import { Friend }           from '../../common/models/Friend';
import { Routes }           from '../../common/Routes';
import { MeteorPromise }    from '../helpers/meteor';
import { Game }             from '../models/Game';
import { Games }            from '../collections/Games';
import {FacebookService} from "../../server/services/FacebookService";
import * as _ from 'lodash';


export module GameStore {

  // FIXME: Games.findOne always returns null
  // export function byId(gameId: Mongo.ObjectID | string): Option<Game> {
  //   const game = <Game>Games.findOne(gameId);
  //   console.log('GameStore.byId(' + gameId + ')', game);
  //   return (game == null) ? new None<Game>() : new Some<Game>(game);
  // }

  export function byId(gameId: Mongo.ObjectID | string): Option<Game> {
    const games = GameStore.list();
    for (let i = 0; i < games.length; i += 1) {
      if (`${games[i]._id}` == `${gameId}`) {
        return new Some<Game>(games[i]);
      }
    }

    return new None<Game>();
  }

  export function list(): Game[] {
    return <Game[]>(
      Games
        .find({}, { sort: { creationTime: -1 } })
        .fetch()
    );
  }

  export function startBotGame() {
    const bot: Friend = FriendStore.bot();
    return JoinRequestStore.send(_.uniqueId(), FacebookService.getFacebookId(Meteor.userId()), bot.userId as string);
  }

  export function quit(game: Game) {
    MeteorPromise.call('Game.quit', game._id, () => {
      browserHistory.push(Routes.Page.home());
    });
  }

}

