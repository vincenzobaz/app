import {OrderChoice} from "./OrderChoice";
import {QuestionType} from "../common/QuestionType";
import {Kind} from "../common/Kind";
import {Item} from "../common/Item";
import {SUBJECT_TYPE} from "../common/SubjectType";
import Question, {RawQuestion} from "../../Question";
import * as _ from 'lodash';
import {SubjectFactory} from "../common/SubjectFactory";
import {Subject} from "../common/Subject";


export interface RawOrderQuestion extends RawQuestion{
    _id: string | Mongo.ObjectID;
    choices?: any;
    items: Item[];
    answer: number[];
    type: QuestionType;
    kind: Kind;
    correct?: boolean;
}



export class OrderQuestion extends Question {

  public items: Item[];
  constructor(_id: string | Mongo.ObjectID,
              type: QuestionType,
              kind: Kind,
              answer: number[],
              userAnswer: number[],
              items: Item[],
              public correct: boolean,
              subject?: Subject
  ) {
    super(_id, subject, type, kind, answer, userAnswer);
    this.items = items;
    }


    static convertChoices(value: OrderChoice[]): Item[] {
         return _.map(value, (c: OrderChoice) => {
            switch (c.subject.type) {
                case SUBJECT_TYPE.Page:
                    return {id: c.uId, text: c.subject.name, subject:c.subject};
                case SUBJECT_TYPE.TextPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                case SUBJECT_TYPE.ImagePost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                case SUBJECT_TYPE.VideoPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                case SUBJECT_TYPE.LinkPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                case SUBJECT_TYPE.Comment:
                    return {id: c.uId, text: c.subject.comment, subject:c.subject};
                case SUBJECT_TYPE.Reactions:
                    let subject = SubjectFactory.fromRaw(c.subject);
                    return {id: c.uId, text: subject.text, subject: subject};
                default:
                    console.error("Ordering subject type not defined: " + c.type);
                    throw new Meteor.Error('500', "Ordering subject type not defined: " + c.type);
            }
        });
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
    let items = raw.items || OrderQuestion.convertChoices(raw.choices);
    let subject: Subject = null;
    if (raw.subject) {
        subject = SubjectFactory.fromRaw(raw.subject);
    }
    return new OrderQuestion(
        raw._id? raw._id: new Mongo.ObjectID(),
        raw.type,
        raw.kind,
        raw.answer,
        raw.userAnswer,
        items,
        raw.correct,
        subject
        );
  }

}
