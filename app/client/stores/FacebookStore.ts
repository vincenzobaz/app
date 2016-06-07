import {MeteorPromise} from "../helpers/meteor";
import {getConfig} from "../helpers/getConfig";

export module FacebookStore {

  export function login(cb = () => {}) {
    const conf = getConfig('facebook');

    if (conf == null) {
      console.error("Facebook config is", conf);
      return;
    }

    Meteor.loginWithFacebook({
      requestPermissions: conf.scope
    }, cb);
  }

  export function getUserInfo(fbUserId) {
    return MeteorPromise.call('Facebook.getUserInfo', fbUserId);
  }

  export function getFriends() {
    return MeteorPromise.call('Facebook.getFriends');
  }

  export function getAvatar(fbUserId) {
    return MeteorPromise.call('Facebook.getAvatar', fbUserId);
  }

  export function getPermissions() {
    return MeteorPromise.call('Facebook.getPermissions');
  }

}

