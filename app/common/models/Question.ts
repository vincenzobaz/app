import { QuestionType } from "./questions/QuestionType";
import { Subject } from "./questions/Subject";
import { questionFromRaw } from "./questions/QuestionFactory";
import { Kind } from "app/common/models/questions/Kind";


export interface RawQuestion {
  _id: string | Mongo.ObjectID,
  subject: Subject,
  type: QuestionType,
  kind: Kind,
  answer?: any,
}

export default class Question {
  constructor(public _id: string | Mongo.ObjectID,
              public subject: Subject,
              public type: QuestionType,
              public kind: Kind,
              public answer?: any) {
  }




  static fromRaw(data: RawQuestion): Question {
    return questionFromRaw(data)
  };
}


