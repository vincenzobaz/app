
(() => {

'use strict';

// FIXME: Awful design...
// TODO: Handle paging.
// TODO: Fix caching.
var FB = Reminisce.Facebook = {

  users: {},
  friends: {},
  avatars: {},

  API_URL: 'https://graph.facebook.com/v2.3',

  api(user, url, options = {}) {
    if (!user) {
      throw new Meteor.Error(500, "You must specify the current user");
    }

    var fullUrl = this.API_URL + url;
    var accessToken = user.services.facebook.accessToken;

    if (!accessToken) {
      throw new Meteor.Error(401, "User isn't logged in or doesn't have an access token");
    }

    var params = Object.assign(options, { access_token: accessToken });

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
    this.friends[user._id] = friends.data;
    return friends.data;
  },

  getUserInfo(user, userId) {
    if (this.users.hasOwnProperty(userId)) {
      return this.users[userId];
    }

    var userInfo = this.api(user, '/' + userId).data;
    this.users[userId] = userInfo;
    return userInfo;
  },

  getAvatar(user, facebookId) {
    if (this.avatars.hasOwnProperty(facebookId)) {
      return this.avatars[facebookId];
    }

    var picture = this.api(user, `/${facebookId}/picture`, {
      redirect: false,
      type: 'square'
    }).data;

    var url = picture.data.url;
    this.avatars[facebookId] = url;
    return url;
  },

  getPermissions(user) {
    return this.api(user, '/me/permissions').data.data;
  }

};

Meteor.methods({
  'Facebook.getUserInfo'(userId) {
    this.unblock();
    var user = Meteor.users.findOne(this.userId);
    return FB.getUserInfo(user, userId);
  },
  'Facebook.getAvatar'(facebookId) {
    this.unblock();
    var user = Meteor.users.findOne(this.userId);
    return FB.getAvatar(user, facebookId);
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

