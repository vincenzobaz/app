import { RawSubject, Subject } from "./Subject";
import { OrderChoice } from "./OrderChoice";
import { QuestionType } from "./QuestionType";
import { Kind } from "./Kind";
import { Item } from "./Item";
import { SubjectType } from "./SubjectType";
import {SubjectWithId} from './SubjectWithId';
import Question from "../Question";
import {OrderAnswer} from "../../../server/services/verification/OrderAnswer";

export interface RawOrderQuestion {
    _id: string | Mongo.ObjectID;
    subject: Subject;
    choices: any;
    answer: number[];
    type: QuestionType;
    kind: Kind;
    items: any;
}



export class OrderQuestion extends Question{
private _choices;
  
  constructor(_id: string | Mongo.ObjectID,
              subject: Subject,
              choices: OrderChoice[],
              answer: number[],
              public items: Item[],
              type: QuestionType,
              kind: Kind) {
    super(_id, subject, type, kind, answer);
    this._choices = choices;
    }


    set choices(value: any) {
        this._choices = value;
        this.items = _.map(value, (c: OrderChoice) => {
            switch (c.subject.type) {
                case SubjectType.Page:
                    return {id: c.uId, text: c.subject.name, subject:c.subject};
                case SubjectType.TextPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                case SubjectType.ImagePost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                case SubjectType.VideoPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                case SubjectType.LinkPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                case SubjectType.Comment:
                    return {id: c.uId, text: c.subject.comment, subject:c.subject};
                default:
                    console.error("Ordering subject type not defined: " + c.type);
                    throw new Meteor.Error(500, "Ordering subject type not defined: " + c.type);
            }
        });
    }


    getKind() {
        return this.kind;
    }

    /**
     * returns the correct id of the answers
     * @returns {[number]}
     */
    getAnswer() {
        if (!Meteor.isServer) {
            throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
        }

        return this.answer;
    }


  static orderQustionFromRaw(raw: RawOrderQuestion) {
    return new OrderQuestion(raw._id, Subject.fromRaw(raw.subject), raw.choices, raw.answer, raw.items, raw.type, raw.kind);
  }
  
};
