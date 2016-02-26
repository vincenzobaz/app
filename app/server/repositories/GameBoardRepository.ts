import { GameBoards } from "../collections/GameBoards";


export const GameBoardRepository = {

  save(gameBoard) {

    GameBoards.upsert(gameBoard._id, gameBoard);
    return gameBoard._id;
  }
};

