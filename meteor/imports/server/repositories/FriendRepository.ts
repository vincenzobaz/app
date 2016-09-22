import {UserRepository} from './UserRepository';
import {Friends}        from '../../common/collections/Friends';
import {Friend}         from "../../common/models/Friend";
import {FBFriend}       from '../services/FacebookService';

export const FriendRepository = {

    friendsOf(userId) {
        return Friends.find({ friendOf: userId }).fetch();
    },

    byFacebookId(facebookId, userId) {
        return Friends.findOne({ facebookId: facebookId, friendOf: userId });
    },

    byUserId(friendUserId, userId) {
        return Friends.findOne({ userId: friendUserId, friendOf: userId });
    },

    save(friend) {

        if (!friend.userId) {
            FriendRepository.updateUserId(friend);
        }

        if (friend._id) {
          Friends.upsert(friend._id, friend);
        }
        else {
          friend._id = Friends.insert(friend);
        }

        return friend;
    },

    updateUserId(friend) {
        const user = UserRepository.byFacebookId(friend.facebookId);

        if (user == null) {
          return false;
        }

        friend.userId = user._id;
        return true;
    },

    updateFriends(userId: Mongo.ObjectID, friends: FBFriend[]) {
        return friends.map((f: FBFriend) => {
            var friend = FriendRepository.byFacebookId(f.id, userId);

            if (friend == null) {
                friend = new Friend(new Mongo.ObjectID(), null, f.id, f.name, userId, false);
            }
            else {
                FriendRepository.updateUserId(friend);
            }

            return FriendRepository.save(friend);
        });
    },

    addBot(userId, bot) {
        var friend: Friend = FriendRepository.byUserId(bot._id, userId);
        if (friend != null) {
            return;
        }

        friend = new Friend(new Mongo.ObjectID(), bot._id, bot._id, bot.name, userId, true);

        FriendRepository.save(friend);
    }

};

