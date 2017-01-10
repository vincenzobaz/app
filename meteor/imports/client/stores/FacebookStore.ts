
import * as Promise from 'bluebird';

import { MeteorPromise }    from "../helpers/meteor";
import { getConfig }        from "../helpers/getConfig";
import { MeteorUser }       from "../../common/collections/MeteorUser";
import { JoinRequestStore } from "./JoinRequestStore";

interface FBGameRequestResponse {
  request: string;
  to: string[];
}

const FBPromise = {

  ui(params: any): Promise<any> {
    return new Promise(function(resolve, reject) {
      FB.ui(params, function(response: any) {
        if (response && !response.error_message) {
          resolve(response);
        }
        else {
          reject(response);
        }
      });
    });
  }

};

export module FacebookStore {

  export function getFriends(): Promise<any> {
    return MeteorPromise.call('Facebook.getFriends');
  }

  export function getAvatar(fbUserId): Promise<any> {
    return MeteorPromise.call('Facebook.getAvatar', fbUserId);
  }

  export function getPermissions(): Promise<any> {
    return MeteorPromise.call('Facebook.getPermissions');
  }

  export function login(cb = () => {}): void {
    const conf = getConfig('facebook');

    if (conf == null) {
      console.error("Facebook config is", conf);
      return;
    }

    Meteor.loginWithFacebook({
      requestPermissions: conf.scope
    }, cb);
  }

  export function showInviteDialog(): Promise<any> {
    const conf = getConfig('facebook');

    if (conf == null) {
      console.error("Facebook config is", conf);
      return;
    }

    const params: RequestsDialogParams = {
      app_id: conf.appId,
      filters: null,
      method: 'apprequests',
      message: 'Do you want to reminisce with me?',
      title: 'Select friends you would like to play with',
      max_recipients: 10
    };

    const callback = (res: FBGameRequestResponse) => {
      if (res) {
        const user     = Meteor.user() as MeteorUser;
        const fbUserId = user.services.facebook.id;
        res.to.forEach(toFbId => {
          JoinRequestStore.send(res.request, fbUserId, toFbId);
        });
      }

      return res;
    };

    return FBPromise.ui(params).then(callback);
  }

  export function showNativeInviteDialog(): void {

    const conf = getConfig('facebook');

    if (conf == null) {
      console.error("Facebook config is", conf);
      return;
    }

    const params: RequestsDialogParams = {
      app_id: conf.appId,
      filters: null,
      method: 'apprequests',
      message: 'Do you want to reminisce with me?',
      title: 'Select friends you would like to play with',
      max_recipients: 10
    };

    const callback = (res) => {
      if (res) {
        const user     = Meteor.user() as MeteorUser;
        const fbUserId = user.services.facebook.id;
        res.recipientsIds.forEach(toFbId => {
          JoinRequestStore.send(res.requestId, fbUserId, toFbId);
        });
      }
    }
    facebookConnectPlugin.showDialog(params, callback);
  }

}

