
var cache = {};

const lazy = (key, obj, prop, compute) => {
  if (cache[key] === undefined) {
    cache[key] = compute(obj[prop]);
  }
  return cache[key];
};

const GameBoardProps = ['_id', 'userId', 'tiles'];

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
        return lazy(this.getId(), this, 'tiles', tiles => tiles.map(tile => {
            if (tile instanceof Tile) {
                return tile;
            }

            return Tile.fromRaw(tile);
        }));
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

    const tiles = _.map(data.tiles, Tile.fromRaw);

    return new GameBoard({ userId, tiles });
};

