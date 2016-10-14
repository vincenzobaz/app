
import * as _ from "lodash";

import {BotService} from "./services/BotService";
import {LoginService} from "./services/LoginService";
import {Server} from "./server";
import {setupServices} from "./services";
import {publishCollections} from "./publish";
import {setupMeteorMethods} from "./methods";
import {JoinRequests} from "./collections/JoinRequests";
import {JoinRequestService} from "./services/JoinRequestService";
import {Games} from "./collections/Games";

export class App {

  run() {
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
  }

  onLogin(attempt) {
    if (!attempt.allowed) {
      return;
    }

    LoginService.postLogin(attempt.user);
  }

}

