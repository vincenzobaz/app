
import {Friend} from './../../../common/models/Friend.jsx';
import {Friends} from './../../../common/collections/Friends.jsx';

function hydrate(friend) {
    if (friend == null) {
        return friend;
    }

    if (!(friend instanceof Friend)) {
        friend = new Friend(friend);
    }

    return friend;
}

export const FriendStore = {

    byId(id) {
        return hydrate(Friends.findOne(id));
    },

    byUserId(userId) {
        return hydrate(Friends.findOne({userId: userId}));
    },

    byFacebookId(facebookId) {
        return hydrate(Friends.findOne({facebookId: facebookId}));
    },

    list() {
        return Friends.find().fetch().map(hydrate);
    },

    friendsWithUserId() {
      return Friends.find({userId: {$ne: null}}).fetch().map(hydrate);
    },

    bot() {
      return Friends.findOne({isBot: true});
    }
};

