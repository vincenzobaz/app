
import { FriendRepository } from './repositories/FriendRepository'
import { MeteorUser }       from './MeteorUser';

export interface FBFriend {
  id: string;
  name: string;
}

const DEBUG = false;
const debug = DEBUG ? (...args) => console.log.apply(console, args) : () => {};

export class _FacebookService {

  private usersInfo: { [key: string]: any }  = {};
  private avatars: { [key: string]: string } = {};

  private appAccessToken: string;

  private static API_VERSION = 'v2.3';
  private static API_URL     = 'https://graph.facebook.com/';

  public userGet(user: MeteorUser, url, options = {}) {
    return this.get(url, this.getUserParams(user, options));
  }

  public userPost(user: MeteorUser, url, options = {}) {
    return this.post(url, this.getUserParams(options));
  }

  public appGet(url, options = {}) {
    return this.get(url, this.getAppParams(options));
  }

  public appPost(url, options = {}) {
    return this.post(url, this.getAppParams(options));
  }

  public get(url, params = {}) {
    try {
      const fullUrl = this.buildUrl(url);

      debug(`[FacebookService] GET ${fullUrl}`, params);

      const res = HTTP.get(fullUrl, { params });

      debug(res);

      if (res.statusCode !== 200) {
        // TODO: Handle errors.
      }

      return res.data;
    }
    catch (e) {
      return { error: e };
    }
  }

  public post(url, params = {}) {
    try {
      const fullUrl = this.buildUrl(url);

      debug(`[FacebookService] POST ${fullUrl}`, params);

      const res = HTTP.post(fullUrl, { params });

      debug(res);

      if (res.statusCode !== 200) {
        // TODO: Handle errors.
      }

      return res.data;
    }
    catch (e) {
      return { error: e };
    }
  }

  public getFriends(user: MeteorUser): FBFriend[] {
    return this.userGet(user, '/me/friends').data;
  }

  public getUserInfo(user: MeteorUser, fbUserId: string) {
    const key = `${user._id}/${fbUserId}`;

    if (this.usersInfo.hasOwnProperty(key)) {
      return this.usersInfo[key];
    }

    const userInfo = this.get(user, '/' + fbUserId);
    this.usersInfo[key] = userInfo;

    return userInfo;
  }

  public getAvatar(user: MeteorUser, fbUserId: string, type = 'small') {
    const key = `${user._id}/${fbUserId}`;

    if (this.avatars.hasOwnProperty(key)) {
      return this.avatars[key];
    }

    const result = this.userGet(user, `/${fbUserId}/picture`, {
      redirect: false,
      type: type
    });

    const url         = result.data.url;
    this.avatars[key] = url;

    return url;
  }

  public getPermissions(user) {
    return this.userGet(user, '/me/permissions').data;
  }

  public postNotification(fbUserId: string, message: string) {
    return this.appPost(`/${fbUserId}/notifications`, {
      href: '/',
      template: message
    });
  }

  private buildUrl(url: string): string {
    return _FacebookService.API_URL + _FacebookService.API_VERSION + url;
  }

  private getAppConfig() {
    return ServiceConfiguration.configurations.findOne({service: 'facebook'});
  }

  private computeProof(accessToken: string) {
    const appConfig = this.getAppConfig();
    return CryptoJS.HmacSHA256(accessToken, appConfig.secret).toString();
  }

  private fetchAppAccessToken(): string {
    if (this.appAccessToken != null) {
      return this.appAccessToken;
    }

    const appConfig = this.getAppConfig();

    const params    = {
      client_id: appConfig.appId,
      client_secret: appConfig.secret,
      grant_type: "client_credentials"
    };

    const res = this.get("/oauth/access_token", params);

    this.appAccessToken = res.access_token;

    return res.access_token;
  }

  private getAppParams(options = {}) {
    const accessToken = this.fetchAppAccessToken();

    return _.extend(options, {
      access_token: accessToken,
      appsecret_proof: this.computeProof(accessToken)
    });
  }

  private getUserParams(user: MeteorUser, options = {}) {
    if (user == null) {
      throw new Meteor.Error('500', 'You must specify the current user');
    }

    const accessToken = user.services.facebook.accessToken;

    if (accessToken == null) {
      throw new Meteor.Error('401', 'User isn\'t logged in or doesn\'t have an access token');
    }

    const params = _.extend(options, {
      access_token: accessToken,
      appsecret_proof: this.computeProof(accessToken)
    });

    return params;
  }

}

export const FacebookService = new _FacebookService();

