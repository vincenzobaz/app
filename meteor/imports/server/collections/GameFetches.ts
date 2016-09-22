import { GameFetch } from "./GameFetch";

export const GameFetches = new Mongo.Collection<GameFetch>('gameFetches', {
    transform(doc) {
        return GameFetch.fromRaw(doc);
    }
});



