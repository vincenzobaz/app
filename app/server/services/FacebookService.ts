
import { FriendRepository } from './../repositories/FriendRepository'
import { MeteorUser }       from './../MeteorUser';
import * as _ from 'lodash';


export interface FBFriend {
  id: string;
  name: string;
}

export type Role = "administrators" | "developers" | "testers"

export const ROLE = {
    Admin: "administrators" as Role,
    Developer: "developers" as Role,
    Tester: "testers" as Role
};

interface RolesData {
    app_id: string;
    user: string;
    role: string;
}

interface Paging {
    cursors: Cursor;
}

interface Cursor {
    beofre: string;
    after: string;
}

const DEBUG = process.env.NODE_ENV === 'development';
const debug = DEBUG ? (...args) => console.log.apply(console, args) : () => {};

export class _FacebookService {

  private usersInfo: { [key: string]: any }  = {};
  private avatars: { [key: string]: string } = {};

  private appAccessToken: string;

  private static API_VERSION = 'v2.6';
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

      const res = HTTP.get(fullUrl, { params });

      if (res.statusCode !== 200) {
        // TODO: Handle errors.
      }

      return res.data;
    }
    catch (e) {
      debug("GET to FB received the error:", e);
      return { error: e };
    }
  }

  public post(url, params = {}) {
    try {
      const fullUrl = this.buildUrl(url);

      debug(`[FacebookService] POST ${fullUrl}`, params);

      const res = HTTP.post(fullUrl, { params });
      
      if (res.statusCode !== 200) {
        // TODO: Handle errors.
      }

      return res.data;
    }
    catch (e) {
      debug("POST to FB received the error:", e);
      return { error: e };
    }
  }
  
  private graphApiDelete(url: string, params: any = {}) {
    try {
      const fullUrl = this.buildUrl(url);

      debug(`[FacebookService] DEL ${fullUrl}`, params);

      const res = HTTP.del(fullUrl, { params });

      debug(res);

      if (res.statusCode !== 200) {
        // TODO: Handle errors.
        debug("Status code wasn't 200", res);
      }
      return res.data;
    }
    catch (e) {
      debug("DELETE to FB received the error:", e);
      return { error: e };
    }
  }
  
  public getFacebookId(userId: string | Mongo.ObjectID) {
    const meteorUser: MeteorUser = Meteor.users.findOne(userId) as MeteorUser;
    if (meteorUser && meteorUser.services && meteorUser.services.facebook) {
      return meteorUser.services.facebook.id;
    } else {
      return null;
    }
  }
  
  public getUserFromFacebookId(fbId: string): MeteorUser {
    return Meteor.users.findOne({'services.facebook.id': fbId});
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
    
    public isDeveloper(user: MeteorUser): boolean {
        if (user == null) {
            throw new Meteor.Error('500', 'You must specify the current user');
        }
        const fbId: string = user.services.facebook.id;
        const appConfig = this.getAppConfig();

        const params = {
            access_token: this.fetchAppAccessToken()
        };
        const result: {data: RolesData[], paging: Paging} = this.get(`/${appConfig.appId}/roles`, params);
        
        const userRole: RolesData = result.data.find((u: RolesData) => u.user == fbId);
        return userRole != null && userRole.role == (ROLE.Admin || ROLE.Developer);
    }
  
  public deleteRequests(requestIds: string[], userFbId) {
    return requestIds.map(r => {
      this.graphApiDelete(`/${r}_${userFbId}`, {access_token: this.fetchAppAccessToken()});
    })
  }

}


export const FacebookService = new _FacebookService();

