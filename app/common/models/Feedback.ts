import {Game} from "../../client/models/Game";
import {Tile} from "./Tile";
import Question from "./Question";
export interface Feedback {
    img: string;
    note: string;
    url: string;
    userId?: Mongo.ObjectID;
    game?: Game;
    tile?: Tile;
    question?: Question;
    creationDate?: Date;
}
