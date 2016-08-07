
import { browserHistory }     from 'react-router';
import { Option, Some, None } from 'option-t';

import { JoinRequestStore } from './JoinRequestStore';
import { FriendStore }      from './FriendStore';
import { Friend }           from '../../common/models/Friend';
import { Routes }           from '../../common/Routes';
import { MeteorPromise }    from '../helpers/meteor';
import { Game }             from '../models/Game';
import { Games }            from '../collections/Games';

import * as _               from 'lodash';

export const GameStore = {

  // FIXME: Games.findOne always returns null
  // export function byId(gameId: Mongo.ObjectID | string): Option<Game> {
  //   const game = <Game>Games.findOne(gameId);
  //   console.log('GameStore.byId(' + gameId + ')', game);
  //   return (game == null) ? new None<Game>() : new Some<Game>(game);
  // }

  byId(gameId: Mongo.ObjectID | string): Option<Game> {
    const games = GameStore.list();
    for (let i = 0; i < games.length; i += 1) {
      if (`${games[i]._id}` == `${gameId}`) {
        return new Some<Game>(games[i]);
      }
    }

    return new None<Game>();
  },

  list(): Game[] {
    return <Game[]>(
      Games
        .find({}, { sort: { creationTime: -1 } })
        .fetch()
    );
  },

  startBotGame() {
    MeteorPromise.call('Game.createBotGame').then(res => {
      console.log(res);
      if (res.status === 'success') {
        browserHistory.push(Routes.Page.playGameId(res.gameId));
      }
    });
  },

  quit(game: Game) {
    MeteorPromise.call('Game.quit', game._id).then(() => {
      browserHistory.push(Routes.Page.home());
    });
  }

}

