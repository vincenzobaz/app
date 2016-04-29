import {GameFetches} from '../collections/GameFetches';

export const GameFetchRepository = {

    save(gameFetch) {

        var doc = _.pick(gameFetch, 'gameId', 'playerId', 'player', 'tries');
        GameFetches.upsert(gameFetch._id, {$set: doc});

        return gameFetch._id;
    }
};

