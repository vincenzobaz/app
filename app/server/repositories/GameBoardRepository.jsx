import {GameBoardProps} from './../../common/models/GameBoard';
import {GameBoards} from './../collections/GameBoards';

export const GameBoardRepository = {

  save(gameBoard) {
    const doc = _.pick(gameBoard, GameBoardProps);

    if (gameBoard._id) {
      GameBoards.update(doc._id, doc);
    } else {
      gameBoard._id = GameBoards.insert(doc);
    }

    return gameBoard._id;
  }
};

