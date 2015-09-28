
GameBoardRepository = {

  save(gameBoard) {
    if (gameBoard._id) {
      GameBoards.update(gameBoard._id, {$set: gameBoard});
    } else {
      gameBoard._id = GameBoards.insert(gameBoard);
    }

    return gameBoard._id;
  }
};

