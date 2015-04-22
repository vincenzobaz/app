
(() => {

// FIXME: Awful design...
// TODO: Handle paging.
// TODO: Fix caching.
Facebook = null;
var FB = Facebook = {

  usersInfo: {},
  friends: {},
  avatars: {},

  API_URL: 'https://graph.facebook.com/v2.3',

  get appSecret() {
    var conf = ServiceConfiguration.configurations.findOne({service: 'facebook'});
    return conf.secret;
  },

  computeProof(accessToken) {
    return CryptoJS.HmacSHA256(accessToken, this.appSecret).toString();
  },

  api(user, url, options = {}) {
    if (!user) {
      throw new Meteor.Error(500, "You must specify the current user");
    }

    var fullUrl = this.API_URL + url;
    var accessToken = user.services.facebook.accessToken;

    if (!accessToken) {
      throw new Meteor.Error(401, "User isn't logged in or doesn't have an access token");
    }

    var params = Object.assign(options, {
      access_token: accessToken,
      appsecret_proof: this.computeProof(accessToken)
    });

    try {
      var res = HTTP.get(fullUrl, { params });

      if (res.statusCode !== 200) {
        // TODO: Handle errors.
      }

      return res.data;
    }
    catch (e) {
      return {error: e};
    }
  },

  getFriends(user) {
    if (this.friends.hasOwnProperty(user._id)) {
      return this.friends[user._id];
    }

    var friends = this.api(user, '/me/friends').data;
    // this.friends[user._id] = friends;
    return friends;
  },

  getUserInfo(user, fbUserId) {
    var key = `${user._id}/${fbUserId}`;
    if (this.usersInfo.hasOwnProperty(key)) {
      return this.usersInfo[key];
    }

    var userInfo = this.api(user, '/' + fbUserId);
    this.usersInfo[key] = userInfo;
    return userInfo;
  },

  getAvatar(user, fbUserId, type = 'small') {
    var key = `${user._id}/${fbUserId}`;
    if (this.avatars.hasOwnProperty(key)) {
      return this.avatars[key];
    }

    var picture = this.api(user, `/${fbUserId}/picture`, {
      redirect: false,
      type: type
    }).data;

    var url = picture.url;
    this.avatars[key] = url;
    return url;
  },

  getPermissions(user) {
    return this.api(user, '/me/permissions').data;
  }

};

Meteor.methods({
  'Facebook.getUserInfo'(userId) {
    this.unblock();
    var user = Meteor.users.findOne(this.userId);
    return FB.getUserInfo(user, userId);
  },
  'Facebook.getAvatar'(facebookId, type) {
    this.unblock();
    var user = Meteor.users.findOne(this.userId);
    return FB.getAvatar(user, facebookId, type);
  },
  'Facebook.getFriends'() {
    this.unblock();
    var user = Meteor.users.findOne(this.userId);
    return FB.getFriends(user);
  },
  'Facebook.getPermissions'() {
    this.unblock();
    var user = Meteor.users.findOne(this.userId);
    return FB.getPermissions(user);
  }
});

})();

