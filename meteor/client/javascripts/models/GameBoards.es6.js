
Reminisce.Collection.GameBoards = new Mongo.Collection("gameBoards", {
  transform(doc) {
    console.log('GameBoard', doc);
    return new GameBoard(doc)
  }
});

Reminisce.Model.GameBoard = class GameBoard {

  constructor(props) {
    _.extend(this, props);
  }

  getId() {
    return this._id;
  }

  getTiles() {
    return lazy(this, 'tiles', tiles =>
      tiles.map(tile =>
        new Reminisce.Model.Tile(tile)));
  }

};

