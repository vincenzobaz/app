
'use strict';

var FacebookStore = {

  login(cb = () => {}) {
    var conf = R.getConfig('facebook');

    console.log("FAcebook config is", conf);

    Meteor.loginWithFacebook({
      requestPermissions: conf.scope
    }, cb);
  },

  getUserInfo(fbUserId) {
    return R.Meteor.call('Facebook.getUserInfo', fbUserId);
  },

  getFriends() {
    return R.Meteor.call('Facebook.getFriends');
  },

  getAvatar(fbUserId) {
    return R.Meteor.call('Facebook.getAvatar', fbUserId);
  },

  getPermissions() {
    return R.Meteor.call('Facebook.getPermissions');
  }

};

Reminisce.FacebookStore = FacebookStore;
