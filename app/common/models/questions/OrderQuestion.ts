import { RawSubject, Subject } from "./Subject";
import { OrderChoice } from "./OrderChoice";
import { QuestionType } from "./QuestionType";
import { Kind } from "./Kind";
import { Item } from "./Item";
import { RawQuestion, default as Question } from "../Question";
import { SubjectType } from "./SubjectType";


import {SubjectWithId} from './SubjectWithId';

const OrderQuestionProps = ['_id', 'subject', 'choices', 'answer', 'type', 'kind', 'items'];

interface RawOrderQuestion {
    _id: string;
    subject: string;
    choices: any;
    answer: any;
    type: string;
    kind: string;
    items: any;
}



  private _answer: number[];
export class OrderQuestion {

  constructor(_id: string,
              subject: Subject,
              choices: OrderChoice[],
              answer: number[],
              public items: Item[],
              type: QuestionType,
              kind: Kind) {

    constructor(private id:string, 
                private subject: string,
                private choices: any,
                private answer: any,
                private type: string,
                private kind: string,
                private items: any) {
        this._id = id;
        this._subject = subject;
        this._choices = choices;
        this._answer = answer;
        this._type = type;
        this._kind = kind;
        this._items = items;
    }

    /**
     * retunrs the Question id
     * @returns {string}
     */
    getId() {
        return this._id;
    }

    /**
     *
     * @returns {Subject}
     */

    getSubject() {
        return this.subject;
    }

    getType() {
        return this.type;
    }

    getItems() {
        return this.items;
    }

    /**
     * returns an array of SubjectWithIds
     * @returns {[SubjectWithId]}
     */
    getChoices() {
        return this.choices;
    }

    setChoices(value: any) {
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
    }
};
