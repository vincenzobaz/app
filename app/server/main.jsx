
import {BotService} from './services/BotService';
import {Server} from './server';
import {setup} from './services';
import {Facebook} from './facebook';
import {FriendRepository} from './repositories/FriendRepository';
import {publishCollections} from './publish';
import {setupMeteorMethods} from './methods';
import {Marker} from '../common/models/questions/Marker';
import Question from './../common/models/Question';
import {MultipleChoiceQuestion} from './../common/models/questions/MultipleChoiceQuestion';
import {questionFromRaw} from './../common/models/questions/QuestionFactory';
import {Subject} from "./../common/models/questions/Subject";


console.log("we start the server", process.env.GAME_CREATOR_URL);


Meteor.startup(() => {
    let q = new Question(null, null, "bla", "cats");
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

    const fbFriends = Facebook.getFriends(user);
    FriendRepository.updateFriends(user._id, fbFriends);
    FriendRepository.addBot(user._id, BotService.botAsFriend());
});

