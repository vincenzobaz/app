import {GameFetches} from '../collections/GameFetches';
import * as _ from 'lodash';

export const GameFetchRepository = {

    save(gameFetch) {

        var doc = _.pick(gameFetch, 'gameId', 'playerId', 'player', 'tries');
        GameFetches.upsert(gameFetch._id, {$set: doc});

        return gameFetch._id;
    }
};

