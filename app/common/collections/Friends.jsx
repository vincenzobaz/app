
import {Friend} from './../models/Friend.jsx';

export const Friends = new Mongo.Collection('friends', {
    transform(doc) {
        return Friend.fromRaw(doc);
    }
});
