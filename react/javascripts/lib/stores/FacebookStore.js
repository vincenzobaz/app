
'use strict';

var call = require('../helpers/meteor').call,
    conf = require('../helpers/getConfig')('facebook');

module.exports = {

  login(cb = () => {}) {
    Meteor.loginWithFacebook({
      requestPermissions: conf.scope
    }, cb);
  },

  getUserInfo(fbUserId) {
    return call('Facebook.getUserInfo', fbUserId);
  },

  getFriends() {
    return call('Facebook.getFriends');
  },

  getAvatar(fbUserId) {
    return call('Facebook.getAvatar', fbUserId);
  },

  getPermissions() {
    return call('Facebook.getPermissions');
  }

};

