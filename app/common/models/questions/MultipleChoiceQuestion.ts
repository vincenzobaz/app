import ObjectID = Mongo.ObjectID;
import {RawSubject, Subject} from "./Subject";
import {RawChoice, Choice} from "./Choice";
import {QuestionType} from "./QuestionType";
import {Kind} from "./Kind";
import {RawQuestion, default as Question} from "../Question";


export interface RawMultipleChoiceQuestion extends RawQuestion{
  choices: RawChoice[];
  answer: number;
}

export class MultipleChoiceQuestion extends Question {
  private _answer: number;
    
  constructor(
      public _id: ObjectID,
      public subject: Subject,
      public choices: Choice[],
      answer: number,
      public type: QuestionType,
      public kind: Kind
  ) {
    super(_id, subject, type, kind);
    this._answer = answer;
  }
  
  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this._answer}`);
    }

    return this._answer;
  }

  static multipleChoiceFromRaw(data: RawMultipleChoiceQuestion) {
    console.log("we call the static method of multiple choice");
    let choices: Choice[] = _.map(data.choices, c =>
        Choice.fromRaw(c)
    );
   
    let subject: Subject = Subject.fromRaw(data.subject);
    return new MultipleChoiceQuestion(
        data._id,
        subject,
        choices,
        data.answer,
        data.type,
        data.kind
    );
  }
}
