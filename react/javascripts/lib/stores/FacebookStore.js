
'use strict';

var call = require('../helpers/meteor').call;

module.exports = {

  login(cb) {
    var service = ServiceConfiguration.configurations.findOne({service: 'facebook'});
    Meteor.loginWithFacebook({
      requestPermissions: service.scope
    }, cb || () => {});
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

