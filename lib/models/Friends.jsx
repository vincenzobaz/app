
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

    isABot() {
        return !!this.isBot;
    }

    getAvatarUrl() {
        var Routes = Reminisce.Routes;

        if (this.isABot()) {
            return Routes.Assets.avatars.bot();
        }

        if (this.getFacebookId() != null) {
          return Routes.Assets.avatars.facebook(this.getFacebookId());
        }

        return Routes.Assets.avatars.default();
    }

};

Friend.fromRaw = (data) => new Friend(data);

