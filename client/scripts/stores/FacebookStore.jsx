
'use strict';

const FacebookStore = {

  login(cb = () => {}) {
    const conf = R.getConfig('facebook');

    if (conf == null) {
      console.error("Facebook config is", conf);
      return;
    }

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
