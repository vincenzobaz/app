
import {Stats, RawStats} from "../../common/models/Stats";

export const Statistics = new Mongo.Collection<Stats>('statistics', {
    transform(doc: RawStats) {
        return Stats.fromRaw(doc);
    }
});
