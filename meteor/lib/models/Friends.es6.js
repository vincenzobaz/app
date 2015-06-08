
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

    getAvatarUrl() {
        var Routes = Reminisce.Routes;

        if (this.isBot()) {
            return Routes.Assets.at('images/bot-avatar.png');
        }

        if (this.getFacebookId() != null) {
          return Routes.Facebook.avatar(this.getFacebookId());
        }

        return Routes.Assets.at('images/avatar-default.png').url;
    }

};

Friend.fromRaw = (data) => new Friend(data);

