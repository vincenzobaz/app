import {Game} from "../../client/models/Game";
import {Tile} from "./Tile";
import Question from "./Question";

export type FeedbackStatus = "New" | "Rejected" | "Confirmed" | "InProgress" | "Done"


export const FEEDBACK_STATUS = {
    New: 'New' as FeedbackStatus,
    Rejected: 'Rejected' as FeedbackStatus,
    Confirmed: 'Confirmed' as FeedbackStatus,
    InProgress: 'InProgress' as FeedbackStatus,
    Done: "Done" as FeedbackStatus
};



export interface Feedback {
    _id?: Mongo.ObjectID;
    img: string;
    note: string;
    url: string;
    userId?: Mongo.ObjectID;
    game?: Game;
    tile?: Tile;
    question?: Question;
    status?: FeedbackStatus;
    creationDate?: Date;
}

