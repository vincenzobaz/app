import {Friends} from './../../common/collections/Friends';
import {UserRepository} from './UserRepository';
import {Friend} from "../../common/models/Friend";

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

    updateFriends(userId, friends) {
        return friends.map((f: Friend) => {
            var friend = FriendRepository.byFacebookId(f._id, userId);

            if (friend == null) {
                friend = new Friend(new Mongo.ObjectID(), f._id, userId, f.name, userId, f.isBot);
            }
            else {
                FriendRepository.updateUserId(friend);
            }

            return FriendRepository.save(friend);
        });
    },

    addBot(userId, bot) {
        var friend: Friend = FriendRepository.byUserId(bot.id, userId);

        if (friend != null) {
            return;
        }

        friend = new Friend(null, bot._id, bot._id, userId, bot.name, true); 

        FriendRepository.save(friend);
    }

};

