import ObjectID = Mongo.ObjectID;
import { QuestionType } from "./questions/QuestionType";
import { Subject } from "./questions/Subject";
import { questionFromRaw } from "./questions/QuestionFactory";
import { Kind } from "app/common/models/questions/Kind";


export interface RawQuestion {
  _id: ObjectID,
  subject: Subject,
  type: QuestionType,
  kind: Kind
}

export default class Question {
  constructor(public _id: ObjectID,
              public subject: Subject,
              public type: QuestionType,
              public kind: Kind) {
  }

  // public static getQuestionFromType(kind, data): Question {
  //   switch (kind) {
  //     case Kind.MultipleChoice:
  //       return MultipleChoiceQuestion.fromRaw(data);
  //     case Kind.Timeline:
  //       return TimelineQuestion.fromRaw(data);
  //     case Kind.Order:
  //       return OrderQuestion.fromRaw(data);
  //     case Kind.Geolocation:
  //       return GeoQuestion.fromRaw(data);
  //     default:
  //       throw new Meteor.Error(404, `Unknown question kind: ${kind}`);
  //   }
  //
  // }


  static fromRaw(data: RawQuestion): Question {
    return questionFromRaw(data)
  };
}


