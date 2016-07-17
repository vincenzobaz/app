
import { Game } from "./Game";

export let Games = new Mongo.Collection<Game>("games", {

  transform(doc): Game {
    return Game.fromRaw(doc);
  }

});

