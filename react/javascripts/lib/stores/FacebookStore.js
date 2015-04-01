
'use strict';

var call = require('../helpers/meteor').call;

module.exports = {

  getFriends() {
    return call('Facebook.getFriends');
  },

  getAvatar(fbUserId) {
    return call('Facebook.getAvatar', fbUserId);
  }

};

