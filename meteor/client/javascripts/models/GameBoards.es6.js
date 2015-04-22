
Reminisce.Collection.GameBoards = new Mongo.Collection("gameBoards", {
  transform(doc) {
    console.log('GameBoard', doc);
    return new GameBoard(doc)
  }
});

Reminisce.Model.GameBoard = class GameBoard {

};

