
GameBoardRepository = {

  save(gameBoard) {
    const doc = _.pick(gameBoard, GameBoardProps);

    if (doc._id) {
      GameBoards.update(gameBoard._id, doc);
    } else {
      gameBoard._id = GameBoards.insert(doc);
    }

    return gameBoard._id;
  }
};

