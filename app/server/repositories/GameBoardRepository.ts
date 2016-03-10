import { GameBoards } from "../collections/GameBoards";
import {GameBoard} from "../../common/models/GameBoard";
import {Tile} from "../../common/models/Tile";
import {KIND} from "../../common/models/questions/Kind";


export const GameBoardRepository = {

  save(gameBoard: GameBoard) {
    if (gameBoard._id) {
      GameBoards.upsert(gameBoard._id, gameBoard);
    } else {
      GameBoards.insert(gameBoard);
    }
    return gameBoard._id;
  }
};

