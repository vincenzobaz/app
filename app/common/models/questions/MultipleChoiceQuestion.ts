import {RawSubject, Subject} from "./Subject";
import {RawChoice, Choice} from "./Choice";
import {QuestionType} from "./QuestionType";
import {KIND, Kind} from "./Kind";
import {RawQuestion, default as Question} from "../Question";
import {SubjectFactory} from "./SubjectFactory";


export interface RawMultipleChoiceQuestion extends RawQuestion{
  choices: RawChoice[];
  answer: number;
}

export class MultipleChoiceQuestion extends Question {
    
  constructor(
      public _id: string | Mongo.ObjectID,
      public subject: Subject,
      public choices: Choice[],
      public answer: number,
      public type: QuestionType,
      public kind: Kind
  ) {
    super(_id, subject, type, kind);
  }
  
  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }

    return this.answer;
  }

  static multipleChoiceFromRaw(data: RawMultipleChoiceQuestion) {

    let choices: Choice[] = _.map(data.choices, c =>
        Choice.fromRaw(c)
    );
   
    let subject: Subject = SubjectFactory.fromRaw(data.subject);
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
