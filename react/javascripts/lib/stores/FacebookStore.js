
'use strict';

var call = require('../helpers/meteor').call,
    getConfig = require('../helpers/getConfig');

module.exports = {

  login(cb = () => {}) {
    var conf = getConfig('facebook');

    console.log("FAcebook config is", conf);

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

