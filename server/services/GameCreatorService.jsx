
class GameCreator {

  constructor(baseUrl) {
    if (baseUrl == null || baseUrl == '') {
      throw new Error('GameCreatorService: missing baseUrl argument.');
    }

    this._baseUrl = baseUrl;
  }

  url(method, params) {
    const query = Querystring.encode(params);
    const url   = `${this._baseUrl}/${method}?${query}`;

    return url;
  }

  fetchData(fbUserId, accessToken, callback) {
    const params = {
      user_id: fbUserId,
      access_token: accessToken
    };

    const url = this.url('fetchData', params);

    console.log(`Server.fetchData(${fbUserId}) - Fetching URL ${url}`);

    return HTTPHelper.get(url, callback);
  }

  fetchGameboard(fbUserId, accessToken, callback) {
    const params = {
      user_id: fbUserId,
      access_token: accessToken
    };

    const url = this.url('gameboard', params);

    console.log(`Server.fetchGameBoard(${fbUserId}) - Fetching URL ${url}`);

    return HTTPHelper.get(url, callback);
  }

};

GameCreatorService = new GameCreator(process.env.GAME_CREATOR_URL);

