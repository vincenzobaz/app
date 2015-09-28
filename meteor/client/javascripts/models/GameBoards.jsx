
Reminisce.Collection.GameBoards = new Mongo.Collection('gameBoards', {
  transform(doc) {
    return Reminisce.Model.GameBoard.fromRaw(doc)
  }
});

Reminisce.Model.GameBoard = GameBoard;

