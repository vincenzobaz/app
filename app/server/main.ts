
import { BotService } from "./services/BotService";
import { Server } from "./server";
import { setup } from "./services";
import { FriendRepository } from "./repositories/FriendRepository";
import { publishCollections } from "./publish";
import { setupMeteorMethods } from "./methods";
import { FacebookService } from "./facebook";
import {RawTileState} from "./collections/TileState";
import {GAME_STATUS, GameStatus} from "../common/models/GameStatus";
import {Game} from "./collections/Game";
import * as _ from "lodash";

console.log("we start the server", process.env.GAME_CREATOR_URL);


Meteor.startup(() => {
    debugger;
    setup();
    publishCollections();
    setupMeteorMethods();
    BotService.createBot();
    BotService.observeGameCreation();
    
    if (process.env.TIMEOUT_BETWEEN_FETCHES == null) {
        throw new Error("Missing environment variable: TIMEOUT_BETWEEN_FETCHES");
    }
    
    Meteor.setInterval(Server.fetchAllBoards.bind(Server), process.env.TIMEOUT_BETWEEN_FETCHES);
});

Accounts.onLogin(attempt => {
    if (!attempt.allowed) {
        return;
    }

    const user = attempt.user;

    Server.fetchData(user._id);

    console.log(`Fetching friends for user ${user._id}...`);
    
    const fbFriends = FacebookService.getFriends(user);
    FriendRepository.updateFriends(user._id, fbFriends);
    FriendRepository.addBot(user._id, BotService.botAsFriend());
});

