
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
            if (doc.isBot) {
                doc.userId = doc.facebookId;
                delete doc.facebookId;
                return doc;
            }
            else {
                FriendRepository.updateUserId(doc);
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
        console.log('Updating friends for user ' + userId);
        return friends.map(f => {
            console.log('Processing friend', f);
            var friend = FriendRepository.byFacebookId(f.id);
            console.log('Found', friend);
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
    }

};

