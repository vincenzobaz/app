
import { browserHistory }     from 'react-router';
import { Option, Some, None } from 'option-t';

import { JoinRequestStore } from './JoinRequestStore';
import { FriendStore }      from './FriendStore';
import { Friend }           from '../../common/models/Friend';
import { MeteorPromise }    from '../helpers/meteor';
import { Game }             from '../models/Game';
import { Games }            from '../collections/Games';

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

  export function start(friendId) {
    return JoinRequestStore.send(friendId);
  }

  export function startBotGame() {
    const bot: Friend = FriendStore.bot();
    return JoinRequestStore.send(bot._id);
  }

  export function quit(game: Game) {
    MeteorPromise.call('Game.quit', game._id, () => {
      browserHistory.push('/');
    });
  }

  export function switchTo(game: Game | Mongo.ObjectID | string, isId = true) {
    const gameId = isId ? game : (<Game>game)._id;

    browserHistory.push(`/play/${gameId}`)
  }

}

const root: any = window;

root.GameStore = GameStore;
root.Games = Games;
