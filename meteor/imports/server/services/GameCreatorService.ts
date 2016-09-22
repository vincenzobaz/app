
import {encode}                  from 'querystring';

import {HTTPHelper}              from '../helpers/http';
import {GameBoard, RawGameBoard} from '../../common/models/GameBoard';

const DEBUG = false;

interface Parameter {
  user_id: string;
  access_token: string;
}

class GameCreator {

  constructor(public baseUrl: string) {}

  url(method, params?: Parameter) {
    let query;

    if (params != null) {
      query = '?' + encode(params);
    }
    else {
      query = '';
    }

    return `${this.baseUrl}/${method}${query}`;
  }

  fetchData(fbUserId, accessToken, callback?: Function) {
    const params = {
      user_id: fbUserId,
      access_token: accessToken
    };

    const url = this.url('fetchData', params);

    DEBUG && console.log('Fetching data from ' + url);

    return HTTPHelper.get(url, callback);
  }

  fetchGameboard(fbUserId: string, accessToken: string, callback?: Function): {data: RawGameBoard} {
    const params = {
      user_id: fbUserId,
      access_token: accessToken
    };

    const url = this.url('gameboard', params);

    DEBUG && console.log('Fetching gameboard from ' + url);

    return HTTPHelper.get(url, callback);
  }

  fetchBuildInfo(callback?: Function) {
    const url = this.url('info');

    return HTTPHelper.get(url, callback);
  }

}

export const GameCreatorService = new GameCreator(process.env.GAME_CREATOR_URL);

