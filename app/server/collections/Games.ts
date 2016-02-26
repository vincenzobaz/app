

import { Game } from "./Game";
export let Games = new Mongo.Collection<Game>("games", {
  transform: function (doc): Game {
    return Game.fromRaw(doc);
  }
});




