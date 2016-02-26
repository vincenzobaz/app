import {encode} from 'querystring';
import {HTTPHelper} from "../helpers/http";

class Account {

  private _baseUrl: string;
  constructor(baseUrl) {
    if (baseUrl == null || baseUrl == '') {
      throw new Error('AccountService: missing baseUrl argument.');
    }

    this._baseUrl = baseUrl;
  }

  url(method, params) {
    const query = encode(params);
    const url   = `${this._baseUrl}/${method}?${query}`;

    return url;
  }

  deleteUserData(fbUserId, callback?: Function) {
    const params = {
      user_id: fbUserId
    };

    const url = this.url('removeUser', params);
    return HTTPHelper.get(url, callback);
  }

}

export const AccountService = new Account(process.env.GAME_CREATOR_URL);


