
GameBoardRepository = {

  save(gameBoard) {
    var doc = _.pick(gameBoard, 'content', 'choices', 'answer');

    if (gameBoard.id) {
      GameBoards.update(gameBoard.id, {$set: doc});
    } else {
      gameBoard.id = GameBoards.insert(doc);
    }

    return gameBoard.id;
  }
};

