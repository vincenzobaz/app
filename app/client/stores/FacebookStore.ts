
import { MeteorPromise }    from "../helpers/meteor";
import { getConfig }        from "../helpers/getConfig";
import { MeteorUser }       from "../../common/collections/MeteorUser";
import { JoinRequestStore } from "./JoinRequestStore";

interface FBGameRequestResponse {
  request: string;
  to: string[];
}

function callFBUI(...args: any[]): Promise<any> {
  return Promise.promisify(FB.ui, FB).apply(FB, args);
}

declare var facebookConnectPlugin: { login: Function };

export module FacebookStore {

  export function login(cb = () => {}): void {
    const conf = getConfig('facebook');

    if (conf == null) {
      console.error("Facebook config is", conf);
      return;
    }

    if (Meteor.isCordova) {
      facebookConnectPlugin.login(conf.scope, cb);
    }
    Meteor.loginWithFacebook({
      requestPermissions: conf.scope
    }, cb);
  }

  export function getUserInfo(fbUserId): Promise<any> {
    return MeteorPromise.call('Facebook.getUserInfo', fbUserId);
  }

  export function getFriends(): Promise<any> {
    return MeteorPromise.call('Facebook.getFriends');
  }

  export function getAvatar(fbUserId): Promise<any> {
    return MeteorPromise.call('Facebook.getAvatar', fbUserId);
  }

  export function getPermissions(): Promise<any> {
    return MeteorPromise.call('Facebook.getPermissions');
  }

  export function showInviteDialog(): Promise<any> {
    const conf = getConfig('facebook');

    const params: RequestsDialogParams = {
      app_id: conf.appId,
      filters: null,
      method: 'apprequests',
      message: 'Do you want to reminisce with me?',
      title: 'Select friends you would like to play with',
      max_recipients: 10
    };

    return callFBUI(params).then((res: FBGameRequestResponse) => {
        if (res) {
          const user     = Meteor.user() as MeteorUser;
          const fbUserId = user.services.facebook.id;

          res.to.forEach(toFbId => {
            JoinRequestStore.send(res.request, fbUserId, toFbId);
          });
        }

        return res;
      }
    );
  }

}

