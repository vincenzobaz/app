import {Tile} from './Tile.jsx';
import {assignProps} from './../../common/helpers/assignProps.jsx';

var cache = {};

const lazy = (key, obj, prop, compute) => {
  if (cache[key] === undefined) {
    cache[key] = compute(obj[prop]);
  }
  return cache[key];
};

export const GameBoardProps = ['_id', 'userId', 'tiles'];

export class GameBoard {

  constructor(props) {
    assignProps(this, GameBoardProps, props);
  }

  getId() {
    return this._id;
  }

  getUserId() {
    return this.userId;
  }

  getTiles() {
    return this.tiles;
  }

  getTileById(tileId) {
    return _.find(this.getTiles(), tile => tile._id === tileId);
  }

  static fromRaw(userId, data) {
    if (typeof userId === 'object') {
      data = userId;
      userId = data.userId;
    }

    const tiles = _.map(data.tiles, Tile.fromRaw.bind(Tile));

    return new GameBoard({userId, tiles});
  };


}

