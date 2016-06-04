
import { Games }         from "./collections/Games";
import { GameBoards }    from "./collections/GameBoards";
import { JoinRequests }  from "./collections/JoinRequests";
import { Friends }       from "../common/collections/Friends";
import { Notifications } from "../common/collections/Notifications";
import {FeedBackCollection} from "../common/collections/FeedbackCollection";
import {FacebookService} from "./services/FacebookService";

const LOG_PUBLISH = process.env.NODE_ENV === 'development';

export function publishCollections() {
    Meteor.publish('games', function() {
        LOG_PUBLISH && console.log(`Publishing games for user ${this.userId}...`);

        return Games.find({
            $or: [
                { player1: this.userId },
                { player2: this.userId }
            ]
        });
    });

    Meteor.publish('gameBoards', function() {
        LOG_PUBLISH && console.log(`Publishing game boards for user ${this.userId}...`);

        return GameBoards.find({ userId: this.userId });
    });

    Meteor.publish('joinRequests', function() {
        LOG_PUBLISH && console.log(`Publishing join requests for user ${this.userId}...`);

        return JoinRequests.find({ to: this.userId });
    });

// TODO: Don't publish access token etc.
    Meteor.publish('userServices', function() {
        LOG_PUBLISH && console.log(`Publishing services for user ${this.userId}...`);

        return Meteor.users.find({ _id: this.userId }, { fields: { 'services': 1 } });
    });

    Meteor.publish('friends', function() {
        LOG_PUBLISH && console.log(`Publishing friends for user ${this.userId}...`);

        return Friends.find({ friendOf: this.userId });
    });

    Meteor.publish('notifications', function() {
        LOG_PUBLISH && console.log(`Publishing notifications for user ${this.userId}...`);

        return Notifications.find({
          userId: this.userId,
          shown: false
        });
    });
    
    Meteor.publish('feedback', function() {
        let user = Meteor.users.findOne(this.userId);
        let isDeveloper = FacebookService.isDeveloper(user)
        if(!isDeveloper) {
            throw new Meteor.Error("User must be a developer or admin to access this collection");
        }
        LOG_PUBLISH && console.log(`Publishing feedback for user ${this.userId}... as he is a developer ${isDeveloper}`);
        return FeedBackCollection.find({});

    });

}


