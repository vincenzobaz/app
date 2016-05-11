import {JoinRequestService} from './services/JoinRequestService';
import {GameService} from './services/GameService';
import {AnswerService} from './services/AnswerService';
import {GameCreatorService} from './services/GameCreatorService';
import {AccountService} from "./services/AccountService";
import {FriendRepository} from './repositories/FriendRepository';
import {NotificationRepository} from './repositories/NotificationRepository';
import {FacebookService} from "./facebook";
import {Server} from "./server";

export function setupMeteorMethods() {
  Meteor.methods({
    
    fetchData(userId) {
      check(userId, String);
    
      Server.fetchData(userId);
    
      return {
        status: 'success'
      };
    },
    
    'Account.deleteAllData'() {
      const userId   = Meteor.userId();
    
      console.log(`Deleting data for user: ${userId}`);
    
      const user     = Meteor.users.findOne(userId);
      const fbUserId = user.services.facebook.id;
    
      const result = AccountService.deleteUserData(fbUserId);
      if (result.statusCode == 200) {
        Meteor.users.remove(userId);
      }
    
      console.log('Data deleted with following result:', result.data.message);
    
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
    
    'JoinRequest.send'(friendId) {
      return JoinRequestService.send(this.userId, friendId);
    },
    
    'Game.start'(gameId) {
      return GameService.start(gameId);
    },
    
    'Game.quit'(gameId) {
      console.error('Method Game.quit is not implemented yet.');
      return {
        status: 'success'
      };
    },
    
    'Answer.timeOut'(gameId, tileId) {
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
        console.error(`ERROR: Couldn't get build informations: ${e}`);
        return {
          status: 'error',
          error: e
        };
      }
    },
    
    'Facebook.getUserInfo'(userId) {
      this.unblock();
      var user = Meteor.users.findOne(this.userId);
      return FacebookService.getUserInfo(user, userId);
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
    }
  });

}

