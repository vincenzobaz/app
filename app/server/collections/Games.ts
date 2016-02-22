

import { Game } from "./Game";
export let Games = new Mongo.Collection("games", {
  transform: function (doc) {
    return Game.fromRaw(doc);
  }
});




