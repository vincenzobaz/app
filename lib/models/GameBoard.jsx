
var cache = {};

const lazy = (key, obj, prop, compute) => {
  if (cache[key] === undefined) {
    cache[key] = compute(obj[prop]);
  }
  return cache[key];
};

GameBoardProps = ['_id', 'userId', 'tiles'];

GameBoard = class GameBoard {

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

};

GameBoard.fromRaw = function(userId, data) {
    if (typeof userId === 'object') {
        data = userId;
        userId = data.userId;
    }

    const tiles = _.map(data.tiles, Tile.fromRaw.bind(Tile));

    return new GameBoard({ userId, tiles });
};

