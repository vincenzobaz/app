
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
    const env = setupServices();

    publishCollections();
    setupMeteorMethods();

    BotService.createBot();
    BotService.observeGames();

    const fetchInterval = env.TIMEOUT_BETWEEN_FETCHES || 5000;

    Meteor.setInterval(Server.fetchAllBoards.bind(Server), fetchInterval);
  }

  onLogin(attempt) {
    if (!attempt.allowed) {
      return;
    }

    LoginService.postLogin(attempt.user);
  }

}

