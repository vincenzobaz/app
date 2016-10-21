
import { Games }         from "./collections/Games";
import { GameBoards }    from "./collections/GameBoards";
import { JoinRequests }  from "./collections/JoinRequests";
import { Friends }       from "../common/collections/Friends";
import { Notifications } from "../common/collections/Notifications";
import {FeedBackCollection} from "../common/collections/FeedbackCollection";
import {FacebookService} from "./services/FacebookService";

export function publishCollections() {
    Meteor.publish('games', function() {
        logger.debug(`Publishing games for user...`, {userId : this.userId});
        const fbId = FacebookService.getFacebookId(this.userId);
        return Games.find({
            $or: [
                { player1: fbId },
                { player2: fbId }
            ]
        });
    });

    Meteor.publish('gameBoards', function() {
        logger.debug(`Publishing game boards for user...`, {userId: this.userId});

        return GameBoards.find({ userId: FacebookService.getFacebookId(this.userId) });
    });

    Meteor.publish('joinRequests', function() {
        logger.log(`Publishing join requests for user...`, {userId: this.userId});

        return JoinRequests.find({ to: FacebookService.getFacebookId(this.userId)});
    });

// TODO: Don't publish access token etc.
    Meteor.publish('userServices', function() {
        logger.debug(`Publishing services for user`, {userId: this.userId});

        return Meteor.users.find({ _id: this.userId }, { fields: { 'services': 1 } });
    });

    Meteor.publish('friends', function() {
        logger.debug(`Publishing friends for user`, {userId: this.userId});

        return Friends.find({ friendOf: this.userId });
    });

    Meteor.publish('notifications', function() {
        logger.debug(`Publishing notifications for user`, {userId : this.userId});

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
        logger.debug(`Publishing feedback for user...`, {userId: this.userId});
        return FeedBackCollection.find({});
    });
}


