
FriendRepository = {

    updateUserId(friend) {
        const user = UserRepository.byFacebookId(friend.facebookId);

        if (user != null) {
            friend.userId = user._id;
            return true;
        }

        return false;
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

    friendsOf(userId) {
        Friends.find({ friendOf: userId });
    },

    byFacebookId(facebookId, userId) {
        return Friends.findOne({ facebookId: facebookId, friendOf: userId });
    },

    byUserId(friendUserId, userId) {
        return Friends.findOne({ userId: friendUserId, friendOf: userId });
    },

    updateFriends(userId, friends) {
        return friends.map(f => {
            var friend = FriendRepository.byFacebookId(f.id, userId);
            if (friend == null) {
                friend = FriendRepository.save({
                    facebookId: f.id,
                    friendOf: userId,
                    name: f.name,
                    isBot: !!f.isBot
                });
            } else {
                FriendRepository.updateUserId(friend);
                FriendRepository.save(friend);
            }
            return friend;
        });
    },

    addBots(userId, bots) {
        bots.forEach(bot => {
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
        });
    }

};

