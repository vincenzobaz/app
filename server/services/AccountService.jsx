
class AccountService {

  constructor(baseUrl) {
    if (baseUrl == null || baseUrl == '') {
      throw new Error('AccountService: missing baseUrl argument.');
    }

    this._baseUrl = baseUrl;
  }

  url(method, params) {
    const query = Querystring.encode(params);
    const url   = `${this._baseUrl}/${method}?${query}`;

    return url;
  }

  deleteUserData(fbUserId, callback) {
    const params = {
      user_id: fbUserId
    };

    const url = this.url('removeUser', params);
    return HTTPHelper.get(url, callback);
  }

};

global.AccountService = new AccountService(process.env.GAME_CREATOR_URL);

