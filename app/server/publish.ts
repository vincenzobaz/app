
import { Games } from "./collections/Games";
import { GameBoards } from "./collections/GameBoards";
import { JoinRequests } from "./collections/JoinRequests";
import { Friends } from "../common/collections/Friends";
const LOG_PUBLISH = true;


export function publishCollections() {
    "use strict";
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
  
}


