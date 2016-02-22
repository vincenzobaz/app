
import {GameBoard, RawGameBoard} from "./../../common/models/GameBoard";

export const GameBoards = new Mongo.Collection('gameBoards', {
    transform(doc: RawGameBoard) {
        return GameBoard.fromRaw(doc);
    }
});

