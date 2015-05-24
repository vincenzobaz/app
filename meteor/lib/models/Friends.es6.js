
Friends = new Mongo.Collection('friends', {
    transform(doc) {
        return Friend.fromRaw(doc);
    }
});

FriendProps = ['_id', 'userId', 'facebookId', 'name', 'friendOf', 'isBot'];

Friend = class Friend {

    constructor(props) {
        assignProps(this, FriendProps, props);
    }

    getId() {
        return this._id;
    }

    getUserId() {
        return this.userId;
    }

    getFacebookId() {
        return this.facebookId;
    }

    getName() {
        return this.name;
    }

    getFriendOf() {
        return this.friendOf;
    }

    isBot() {
        return !!this.isBot;
    }

};

Friend.fromRaw = (data) => new Friend(data);

