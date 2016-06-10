import {Subject} from "../common/Subject";
import {RawChoice, Choice} from "./Choice";
import {QuestionType} from "../common/QuestionType";
import {Kind} from "../common/Kind";
import {RawQuestion, default as Question} from "../../Question";
import {SubjectFactory} from "../common/SubjectFactory";
import * as _ from "lodash";


export interface RawMultipleChoiceQuestion extends RawQuestion{
  choices: RawChoice[];
  answer: number;
  userAnswer?: number;
}

export class MultipleChoiceQuestion extends Question {
    
  constructor(
      _id: string | Mongo.ObjectID,
      subject: Subject,
      type: QuestionType,
      kind: Kind,
      answer: number,
      userAnswer: number,
      public choices: Choice[]
  ) 
  {
    super(_id, subject, type, kind,  answer, userAnswer);
  }
  
  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }

    return this.answer;
  }

  static multipleChoiceFromRaw(raw: RawMultipleChoiceQuestion) {

    let choices: Choice[] = _.map(raw.choices, c =>
        Choice.fromRaw(c)
    );
   
    let subject: Subject = SubjectFactory.fromRaw(raw.subject);
    return new MultipleChoiceQuestion(
        raw._id? raw._id: new Mongo.ObjectID(),
        subject,
        raw.type,
        raw.kind,
        raw.answer,
        raw.userAnswer,
        choices
    );
  }
}
