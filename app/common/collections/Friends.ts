
import {Friend} from './../models/Friend';

export const Friends = new Mongo.Collection<Friend>('friends', {
    transform(doc) {
        return Friend.fromRaw(doc);
    }
});
