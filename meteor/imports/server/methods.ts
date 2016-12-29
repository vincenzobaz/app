import {JoinRequestService} from './services/JoinRequestService';
import {BotService} from './services/BotService';
import {GameService} from './services/GameService';
import {AnswerService} from './services/AnswerService';
import {GameCreatorService} from './services/GameCreatorService';
import {AccountService} from './services/AccountService';
import {FacebookService} from './services/FacebookService';
import {FriendRepository} from './repositories/FriendRepository';
import {NotificationRepository} from './repositories/NotificationRepository';
import {Server} from './server';
import {Marker} from '../common/models/questions/geolocation/Marker';
import {GeoNameEntity} from '../common/models/GeoNameEntity';
import {GeoNameEntityCollection} from './collections/GeoNameEntityCollection';
import {Admin1CodeCollection} from './collections/Admin1CodeCollection';
import {Feedback} from "../common/models/Feedback";
import {FeedBackCollection} from "../common/collections/FeedbackCollection";
import {JoinRequestRepository} from "./repositories/JoinRequestRepository";
import {Statistics} from "./collections/Statistics";
import LogsToken from "./collections/LogsToken";
import {LogsTokens} from "./collections/LogsTokens";
import {Reactioners} from "./collections/Reactioners";
import {Reactioner} from "../common/models/Reactioner";
var Future = Npm.require('fibers/future');

export function setupMeteorMethods() {
    Meteor.methods({

        'fetchData'(userId) {
            check(userId, String);

            Server.fetchData(userId);

            return {
                status: 'success'
            };
        },

        /**
         * Fill the database with user statistics retrieved in the stats module
         * @param userId userId of the player
         * @param from start date, optional
         * @param to end date, optional
         */
            'fetchStats'(from?: Date, to?: Date) {
            const userId = Meteor.userId();
            if (!userId) {
                logger.error("Could not retrieve userId for stats generation");
                return;
            }
            const user = Meteor.users.findOne(userId);
            const fbUserId = user.services.facebook.id;

            return Server.fetchStats(fbUserId, from, to, fetchStatsCallback);
        },

        /**
         * Fill the database with user reactioner list and blacklist retrieved from game creator.
         */
            'fetchReactioners'() {
            const userId = Meteor.userId();
            if (!userId) {
                logger.error("Could not retrieve userId for reactioner retrieval");
                return;
            }
            const user = Meteor.users.findOne(userId);
            const fbUserId = user.services.facebook.id;


            // Retrieve blacklist
            Server.fetchBlacklist(fbUserId,
                (error, result) => fetchReactionersCallback(error, result, fbUserId, true));

            // Retrieve reactioner list
            return Server.fetchReactioners(fbUserId,
                (error, result) => fetchReactionersCallback(error, result, fbUserId));
        },

        /**
         * Communicate to game creator that the received reactioners have to be blacklisted
         * @param evilPeople the list of reactioners to avoid
         */
         'addToBlacklist'(evilPeople: Reactioner[]) {
            const userId = Meteor.userId();
            if (!userId) {
                logger.error("Could not retrieve userId for reactioner retrieval");
                return;
            }
            const user = Meteor.users.findOne(userId);
            const fbUserId = user.services.facebook.id;

            Server.pushBlacklist(fbUserId, evilPeople);
        },

        'Account.deleteAllData'() {
            const userId = Meteor.userId();

            if (!userId) {
                return {
                    status: 'error',
                    msg: 'Empty userId.'
                };
            }

            logger.info(`Deleting data for user: ${userId}`, {userId: userId});

            const user = Meteor.users.findOne(userId);
            const fbUserId = user.services.facebook.id;

            const result = AccountService.deleteUserData(fbUserId);

            if (result.statusCode == 200) {
                Meteor.users.remove(userId);
                JoinRequestRepository.removeRequestsOf(fbUserId);
                NotificationRepository.removeNotificationsOf(userId);
                GameService.removeUnfinished(fbUserId);
            }

            logger.info('Data deleted with following result:', result.data.message);

            return {
                status: result.statusCode == 200 ? 'success' : 'error',
                msg: result.data.message
            };
        },

        'JoinRequest.decline'(requestId) {
            return JoinRequestService.decline(requestId);
        },

        'JoinRequest.accept'(requestId) {
            return JoinRequestService.accept(requestId);
        },

        'JoinRequest.send'(fbRequest: string, fromFbId: string, toFbId: string) {
            return JoinRequestService.send(fromFbId, toFbId, fbRequest);
        },

        'FBJoinRequests.delete'(fbRequestIds: string[]) {
            return FacebookService.deleteRequests(fbRequestIds, FacebookService.getFacebookId(Meteor.userId()));
        },

        'Game.start'(gameId) {
            return GameService.start(gameId);
        },

        'Game.createBotGame'() {
            const fbId = FacebookService.getFacebookId(this.userId);
            return BotService.createBotGame(fbId);
        },

        'Game.quit'(gameId) {
            logger.error('Method Game.quit is not implemented yet.', {gameId: gameId});

            return {
                status: 'success'
            };
        },

        'Logs.createToken'() {
            const userId = Meteor.userId();
            const user = Meteor.users.findOne(userId);
            if (typeof user != 'undefined' && user.profile.isDev) {
                var now = new Date();
                var expiration = new Date(now.getTime() + 60 * 60 * 1000);
                var token = new LogsToken(userId, expiration.getTime() / 1000);
                LogsTokens.upsert({_id: userId}, token);
                return {
                    status: 'success'
                };
            } else {
                return {
                    status: 'failure'
                }
            }
        },

        'Answer.timeOut'(gameId, tileId): {status: string, message: string}  {
            check(gameId, Mongo.ObjectID);
            check(tileId, Mongo.ObjectID);

            return AnswerService.timeOut(gameId, tileId);
        },

        'Answer.post'(gameId, tileId, answers) {
            check(gameId, Mongo.ObjectID);
            check(tileId, Mongo.ObjectID);

            return AnswerService.post(gameId, tileId, answers);
        },

        'Build.info'(): {status: string, data?: any, error?: string} {
            try {
                const result = GameCreatorService.fetchBuildInfo();
                const data = (result.data != null) ? result.data : JSON.parse(result.content);

                return {
                    status: 'success',
                    data: data
                };
            } catch (e) {
                logger.error(`Couldn't get build informations: ${e}`);
                return {
                    status: 'error',
                    error: e
                };
            }
        },

        'Facebook.getAvatar'(facebookId, type) {
            this.unblock();
            var user = Meteor.users.findOne(this.userId);
            return FacebookService.getAvatar(user, facebookId, type);
        },

        'Facebook.getFriends'() {
            this.unblock();
            const user = Meteor.users.findOne(this.userId);
            const fbFriends = FacebookService.getFriends(user);
            return FriendRepository.updateFriends(this.userId, fbFriends);
        },

        'Facebook.getPermissions'() {
            this.unblock();
            var user = Meteor.users.findOne(this.userId);
            return FacebookService.getPermissions(user);
        },

        'Notifications.markAsShown'(ids: string[]) {
            this.unblock();
            NotificationRepository.markAsShown(Meteor.userId(), ids);
        },

        'Geolocation.getLocationName'(position: Marker) {
            let entity: GeoNameEntity;
            entity = GeoNameEntityCollection.findOne({
                loc: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [position.longitude, position.latitude]
                        },
                        $maxDistance: 100000,
                    }
                },
                country_code: {$exists: true},
                feature_class: "P"
            });
            //If we can't find anything we display questions marks
            if (!entity) {
                return "???"
            }
            const admind1Entity = Admin1CodeCollection.findOne({
                "area_code": `${entity.countryCode}.${pad(entity.admin1Code, 2)}`
            });
            //if we can't fine an admin area (usually admin code 0) we display the name of the location
            if (!admind1Entity) {
                return entity.name;
            }
            return `${entity.name}, ${admind1Entity.name}`;
        },

        'Geolocation.getSuggestions'(place: string, countryCode: string) {
            if (!place || place.length == 0) {
                return;
            }

            let future = new Future();
            let query = {};
            if (!countryCode || !countryCode.length) {
                query = {
                    canonical: {$regex: "^" + place.trim().toLocaleLowerCase() + ".*"}
                }
            } else {
                query = {
                    canonical: {$regex: "^" + place.trim().toLocaleLowerCase() + ".*"},
                    country_code: countryCode.trim().toUpperCase(),
                };
            }

            GeoNameEntityCollection.rawCollection().find(query,
                {sort: {population: -1}, limit: 5})
                .maxTimeMS(1000).toArray(function (err, items) {
                if (err) {
                    future.return([])
                }
                else {
                    future.return(items.map(e => GeoNameEntity.fromRaw(e)));
                }
            });
            return future.wait();
        },

        'SendFeedback'(feedback: Feedback) {
            FeedBackCollection.insert(feedback);
        }


    });

}

// function getSuggestions(place: string): Promise<GeoNameEntity[]> {
//   let promise = new Promise();
//   GeoNameEntityCollection.rawCollection().find({
//     canonical: {$regex: "^" + place.trim().toLocaleLowerCase() + ".*"},
//   }, {sort: {population: -1}, limit: 5}).maxTimeMS(500).toArray(function(err,items){
//     if(err){
//       console.log("something went wrong")
//     }
//     else {
//       promise.resolve(items);
//     }
//   });
//   return promise;
// }

function pad(value: string, size: number): string {
    if (isNaN(value as any)) {
        return value;
    }
    var s = String(value);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
}


/**
 * Callback to be executed when the list of of RawStats object is received
 * from the stats server.
 * Data are transformed and stored into a mongo collection.
 */
function fetchStatsCallback(error, result) {
    if (error || result == null || result.data == null) {
        logger.error("Could not fetch stats", {error: error});
    }
    result.data.stats.forEach(rawStat => {
            rawStat.date = new Date(rawStat.date);
            let beginDay: Date = new Date(rawStat.date.getFullYear(), rawStat.date.getMonth(), rawStat.date.getDate(), 0, 0, 0, 0);
            Statistics.upsert(
                {userId: rawStat.userId, date: {'$gte': beginDay, '$lte': rawStat.date}},
                rawStat,
                () => logger.debug('Stat retrieved and cached', {userId: rawStat.userId, date: rawStat.date})
            );
        }
    );
}

/**
 * Callback to be executed upon reception of the reactioner list from the
 * game creator.
 * Data are prepared and stored into a mongo collection.
 */
function fetchReactionersCallback(error, result, fbId: string, defaultBool = false) {
    if (error || result == null || result.data == null) {
        logger.error("Could not fetch reactioner list", {error: error});
    }
    result.data.forEach(reactioner => {
        let entry: Reactioner = {
            userId: reactioner.userId,
            userName: reactioner.userName,
            blacklisted: defaultBool,
            thisId: fbId
        };
        Reactioners.upsert(
            {thisId: fbId, userId: reactioner.userId},
            entry,
            () => logger.debug('Reactioner received and cached', {userId: entry.userId, name: entry.userName}));
    });
}
