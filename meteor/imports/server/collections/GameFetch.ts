export interface RawGamefetch {
  _id: string | Mongo.ObjectID;
  gameId: string | Mongo.ObjectID;
  playerId: string | Mongo.ObjectID;
  player: number;
  tries: number;
}

export class GameFetch implements RawGamefetch {

  constructor(public _id: string | Mongo.ObjectID,
              public gameId: string | Mongo.ObjectID,
              public playerId: string | Mongo.ObjectID,
              public player: number,
              public tries: number) {
  }


  incrementTries() {
    this.tries += 1;
  }

  static fromRaw(raw: RawGamefetch): GameFetch {
    return new GameFetch(raw._id, raw.gameId, raw.playerId, raw.player, raw.tries);
  }

}
;
