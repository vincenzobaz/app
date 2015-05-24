
FriendRepository = {

    save(friend) {
        const doc = _.pick(friend, ...FriendProps);

        if (!doc.userId) {
            if (doc.isBot) {
                doc.userId = doc.facebookId;
                delete doc.facebookId;
            }
            else {
                const user = UserRepository.byFacebookId(doc.facebookId);
                doc.userId = user ? user._id : null;
            }
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

    byFacebookId(facebookId) {
        return Friends.findOne({ facebookId });
    },

    updateFriends(userId, friends) {
        return friends.map(f => {
            var friend = FriendRepository.byFacebookId(f.id);
            if (friend == null) {
                friend = FriendRepository.save({
                    facebookId: f.id,
                    friendOf: userId,
                    name: f.name,
                    isBot: !!f.isBot
                });
            }
            return friend;
        });
    }

};

