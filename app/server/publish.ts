
import { Games }         from "./collections/Games";
import { GameBoards }    from "./collections/GameBoards";
import { JoinRequests }  from "./collections/JoinRequests";
import { Friends }       from "../common/collections/Friends";
import { Notifications } from "../common/collections/Notifications";
import {FacebookService} from "./services/FacebookService";

const LOG_PUBLISH = process.env.NODE_ENV === 'development';

export function publishCollections() {
    Meteor.publish('games', function() {
        LOG_PUBLISH && console.log(`Publishing games for user ${this.userId}...`);
        const fbId = FacebookService.getFacebookId(this.userId);
        return Games.find({
            $or: [
                { player1:  fbId},
                { player2: fbId }
            ]
        });
    });

    Meteor.publish('gameBoards', function() {
        LOG_PUBLISH && console.log(`Publishing game boards for user ${this.userId}...`);

        return GameBoards.find({ userId: FacebookService.getFacebookId(this.userId) });
    });

    Meteor.publish('joinRequests', function() {
        LOG_PUBLISH && console.log(`Publishing join requests for user ${this.userId}...`);

        return JoinRequests.find({ to: FacebookService.getFacebookId(this.userId)});
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

}


