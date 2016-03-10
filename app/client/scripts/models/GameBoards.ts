import {GameBoard} from './../../../common/models/GameBoard';

export const GameBoards = new Mongo.Collection('gameBoards', {
  transform(doc) {
    return GameBoard.fromRaw(doc)
  }
});


