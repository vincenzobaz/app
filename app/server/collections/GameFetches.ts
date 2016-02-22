export const GameFetches = new Mongo.Collection('gameFetches', {
    transform(doc) {
        return GameFetch.fromRaw(doc);
    }
});

export interface RawGamefetch {
  _id: string;
  gameId: string;
  playerId: string;
  player: number;
  tries: number;
}

export class GameFetch {

    constructor(public _id: string,
                public gameId: string,
                public playerId: string,
                public player: number,
                public tries: number) {}
  

    incrementTries() {
        this.tries += 1;
    }
  
    static fromRaw(raw: RawGamefetch): GameFetch {
        return new GameFetch(raw._id, raw.gameId, raw.playerId, raw.player, raw.tries);
    }

};


