
import * as _ from "lodash";

import { BotService }              from "./services/BotService";
import { Server }                  from "./server";
import { setupServices }           from "./services";
import { FacebookService }         from "./services/FacebookService";
import { FriendRepository }        from "./repositories/FriendRepository";
import { publishCollections }      from "./publish";
import { setupMeteorMethods }      from "./methods";
import { RawTileState }            from "./collections/TileState";
import { GAME_STATUS, GameStatus } from "../common/models/GameStatus";
import { Game }                    from "./collections/Game";
import {GeoNameEntityCollection} from "./collections/GeoNameEntityCollection";

Meteor.startup(() => {
    setupServices();
    
    publishCollections();
    setupMeteorMethods();

    BotService.createBot();
    BotService.observeGameCreation();

    if (process.env.TIMEOUT_BETWEEN_FETCHES == null) {
        throw new Error("Missing environment variable: TIMEOUT_BETWEEN_FETCHES");
    }

    const interval = process.env.TIMEOUT_BETWEEN_FETCHES || 5000;

    Meteor.setInterval(Server.fetchAllBoards.bind(Server), interval);
});

Accounts.onLogin(attempt => {
    if (!attempt.allowed) {
        return;
    }

    const user = attempt.user;
    if (user.services && user.services.facebook) {
      Server.fetchData(user.services.facebook.id);
      const fbFriends = FacebookService.getFriends(user);
      FriendRepository.updateFriends(user._id, fbFriends);
    }

    FriendRepository.addBot(user._id, BotService.botAsFriend());
});

