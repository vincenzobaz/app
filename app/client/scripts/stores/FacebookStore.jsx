
'use strict';

import {MeteorPromise} from './../boot/helpers/meteor.jsx';
import {getConfig} from './../boot/helpers/getConfig.jsx'

export const FacebookStore = {

  login(cb = () => {}) {
    const conf = getConfig('facebook');
    if (conf == null) {
      console.error("Facebook config is", conf);
      return;
    }
    Meteor.loginWithFacebook({
      requestPermissions: conf.scope
    }, cb);
  },

  getUserInfo(fbUserId) {
    return MeteorPromise.call('Facebook.getUserInfo', fbUserId);
  },

  getFriends() {
    return MeteorPromise.call('Facebook.getFriends');
  },

  getAvatar(fbUserId) {
    return MeteorPromise.call('Facebook.getAvatar', fbUserId);
  },

  getPermissions() {
    return MeteorPromise.call('Facebook.getPermissions');
  }

};


