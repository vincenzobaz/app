

import { Game } from "./Game";
import {GAME_STATUS} from "../../common/models/GameStatus";
import {BotService} from "../services/BotService";

export let Games = new Mongo.Collection<Game>("games", {
  transform: function (doc): Game {
    return Game.fromRaw(doc);
  }
});

