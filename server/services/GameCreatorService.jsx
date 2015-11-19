
class GameCreator {

  constructor(baseUrl) {
    if (baseUrl == null || baseUrl == '') {
      throw new Error('GameCreatorService: missing baseUrl argument.');
    }

    this._baseUrl = baseUrl;
  }

  url(method, params) {
    let query;

    if (params != null) {
      query = '?' + Querystring.encode(params);
    }
    else {
      query = '';
    }

    const url = `${this._baseUrl}/${method}${query}`;
    return url;
  }

  fetchData(fbUserId, accessToken, callback) {
    const params = {
      user_id: fbUserId,
      access_token: accessToken
    };

    const url = this.url('fetchData', params);

    return HTTPHelper.get(url, callback);
  }

  fetchGameboard(fbUserId, accessToken, callback) {
    const params = {
      user_id: fbUserId,
      access_token: accessToken
    };

    const url = this.url('gameboard', params);

    return HTTPHelper.get(url, callback);
  }

};

global.GameCreatorService = new GameCreator(process.env.GAME_CREATOR_URL);

