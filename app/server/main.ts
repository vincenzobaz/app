import * as _ from "lodash";
import {BotService} from "./services/BotService";
import {Server} from "./server";
import {setupServices} from "./services";
import {FacebookService} from "./services/FacebookService";
import {FriendRepository} from "./repositories/FriendRepository";
import {publishCollections} from "./publish";
import {setupMeteorMethods} from "./methods";
import {JoinRequests} from "./collections/JoinRequests";
import {JoinRequestService} from "./services/JoinRequestService";
import {Games} from "./collections/Games";

Meteor.startup(() => {
  setupServices();

  publishCollections();
  setupMeteorMethods();

  BotService.createBot();
  BotService.observeGames();

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
  const userFbId = FacebookService.getFacebookId(user._id);
  BotService.proposeGameToPlayerIfNecessary(userFbId);
  if (user.services && user.services.facebook) {
    Server.fetchData(user.services.facebook.id);
    const fbFriends = FacebookService.getFriends(user);
    FriendRepository.updateFriends(user._id, fbFriends);
  }

  FriendRepository.addBot(user._id, BotService.botAsFriend());
});

