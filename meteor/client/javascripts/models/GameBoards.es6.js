
Reminisce.Collection.GameBoards = new Mongo.Collection("gameBoards", {
  transform(doc) {
    return new Reminisce.Model.GameBoard(doc)
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
    return lazy(this.getId(), this, 'tiles', tiles =>
      tiles && tiles.map(tile => new Reminisce.Model.Tile(tile))) || [];
  }

};

