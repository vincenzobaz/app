import {Friends} from './../../common/collections/Friends.jsx';
import {FriendProps} from './../../common/models/Friend.jsx';
import {UserRepository} from './UserRepository.jsx';

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
        const doc = _.pick(friend, ...FriendProps);

        if (!doc.userId) {
            FriendRepository.updateUserId(doc);
        }

        if (friend._id) {
            Friends.update(friend._id, doc);
        }
        else {
            friend._id = Friends.insert(doc);
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
        return friends.map(f => {
            var friend = FriendRepository.byFacebookId(f.id, userId);

            if (friend == null) {
                friend = {
                    facebookId: f.id,
                    friendOf: userId,
                    name: f.name,
                    isBot: !!f.isBot,
                    userId: null
                };
            }
            else {
                FriendRepository.updateUserId(friend);
            }

            return FriendRepository.save(friend);
        });
    },

    addBot(userId, bot) {
        var friend = FriendRepository.byUserId(bot.id, userId);

        if (friend != null) {
            return;
        }

        friend = {
            facebookId: bot.id,
            userId: bot.id,
            friendOf: userId,
            name: bot.name,
            isBot: true
        };

        FriendRepository.save(friend);
    }

};

