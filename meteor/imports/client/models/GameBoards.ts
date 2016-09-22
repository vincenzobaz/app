import {GameBoard} from '../../common/models/GameBoard';

export const GameBoards = new Mongo.Collection<GameBoard>('gameBoards', {
  transform(doc) {
    return GameBoard.fromRaw(doc)
  }
});


