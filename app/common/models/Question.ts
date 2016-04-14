import {QuestionType}        from "./questions/common/QuestionType";
import {Subject, RawSubject} from "./questions/common/Subject";
import {QuestionFactory}     from "./questions/QuestionFactory";
import {KIND, Kind}          from "questions/common/Kind";

export interface RawQuestion {
  _id: string | Mongo.ObjectID,
  subject: RawSubject,
  type: QuestionType,
  kind: Kind,
  answer?: any,
  userAnswer?: any;
}

export default class Question {
  constructor(
    public _id: string | Mongo.ObjectID,
    public subject: Subject,
    public type: QuestionType,
    public kind: Kind,
    public answer?: any,
    public userAnswer?: any
  ) {}

  static fromRaw(data: RawQuestion): Question {
    return QuestionFactory.questionFromRaw(data)
  };
}

