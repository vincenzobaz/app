
function hydrate(friend) {
    if (friend == null) {
        return friend;
    }

    if (!(friend instanceof Friend)) {
        friend = new Friend(friend);
    }

    return friend;
}

Reminisce.Store.FriendStore = {

    byUserId(userId) {
        return hydrate(Friends.findOne({userId: userId}));
    },

    byFacebookId(facebookId) {
        return hydrate(Friends.findOne({facebookId: facebookId}));
    },

    list() {
        return Friends.find().fetch().map(hydrate);
    }

};

