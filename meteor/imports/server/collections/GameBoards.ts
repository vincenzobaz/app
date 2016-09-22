
import {GameBoard, RawGameBoard} from "../../common/models/GameBoard";

export const GameBoards = new Mongo.Collection<GameBoard>('gameBoards', {
    transform(doc: RawGameBoard) {
        return GameBoard.fromRaw(doc);
    }
});

