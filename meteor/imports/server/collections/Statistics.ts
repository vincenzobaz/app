import {RawStats, Stats} from "../../common/models/Stats"

/**
 * Collection used for caching user statistics
 * @type {Mongo.Collection<Stats>}
 */
export const Statistics = new Mongo.Collection<Stats>('statistics', {
    transform(doc: RawStats) {
        return Stats.fromRaw(doc);
    }
});
