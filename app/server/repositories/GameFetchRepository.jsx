import {GameFetches} from './../collections/GameFetches';

export const GameFetchRepository = {

    save(gameFetch) {

        var doc = _.pick(gameFetch, 'gameId', 'playerId', 'player', 'tries');
        if (gameFetch._id) {
            GameFetches.update(gameFetch._id, {$set: doc});
        } else {
            gameFetch._id = GameFetches.insert(gameFetch);
        }
        return gameFetch._id;
    }
};

