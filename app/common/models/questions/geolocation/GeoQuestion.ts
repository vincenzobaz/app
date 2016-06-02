import {RawSubject, Subject} from "../common/Subject";
import {QuestionType} from "../common/QuestionType";
import {KIND, Kind} from "../common/Kind";
import {RawQuestion, default as Question} from "../../Question";
import {Marker} from "./Marker";
import {Location} from "./Location";
import {SubjectFactory} from "../common/SubjectFactory";
import {GeoAnswer} from "../answers/GeoAnswer";


export interface RawGeoQuestion extends RawQuestion {
  range: number,
  defaultLocation: Location,
  answer: FBLocation,
  userAnswer: GeoAnswer
  correct?: boolean;
}

export class GeoQuestion extends Question {
  constructor(
      _id: string | Mongo.ObjectID, 
      subject: Subject,
      type: QuestionType,
      kind: Kind,
      answer: FBLocation,
      userAnswer: GeoAnswer,
      public range: number, 
      public defaultLocation: Location,
      public correct: boolean
      ) 
  {
    super(_id, subject, type, kind, answer, userAnswer);
  }

  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }
    return new Marker(this.answer.latitude, this.answer.longitude);
  }
  


  static geoQuestionFromRaw(raw: RawGeoQuestion) {
    let subject = SubjectFactory.fromRaw(raw.subject);
    return new GeoQuestion(
        raw._id? raw._id: new Mongo.ObjectID(), 
        subject,
        raw.type,
        raw.kind,
        raw.answer,
        raw.userAnswer,
        raw.range, 
        raw.defaultLocation,
        raw.correct
    );
  }
}




