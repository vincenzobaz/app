
import { Server }           from '../server';
import { BotService }       from './BotService';
import { FacebookService }  from './FacebookService';
import { FriendRepository } from '../repositories/FriendRepository';

export const LoginService = {

  postLogin(user: Meteor.User) {
    const userFbId = FacebookService.getFacebookId(user._id);

    if (!userFbId) {
      console.log(`User ${user._id} doesn't have a Facebook id.`)
      return;
    }

    Server.fetchData(userFbId);

    const isDev = FacebookService.isDeveloperFb(userFbId);

    Meteor.users.update(user._id, {
      $set: { 'profile.isDev': isDev }
    });

    const fbFriends = FacebookService.getFriends(user);
    FriendRepository.updateFriends(user._id, fbFriends);

    FriendRepository.addBot(user._id, BotService.botAsFriend());
  }

};

