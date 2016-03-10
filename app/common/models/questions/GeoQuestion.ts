import {RawSubject, Subject} from "./Subject";
import {QuestionType} from "./QuestionType";
import {KIND, Kind} from "./Kind";
import {RawQuestion, default as Question} from "../Question";
import {Marker} from "./Marker";
import {Location} from "./Location";
import {SubjectFactory} from "./SubjectFactory";


export interface RawGeoQuestion extends RawQuestion {
  range: number,
  defaultLocation: Location,
  answer: Location,
}

export class GeoQuestion extends Question {
  constructor(
      _id: string | Mongo.ObjectID, 
      subject: Subject, 
      public range: number, 
      public defaultLocation: Location,
      public answer: Location,
      type: QuestionType,
      kind: Kind) 
  {
    super(_id, subject, type, kind);
  }

  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }
    return new Marker(this.answer.latitude, this.answer.longitude);
  }
  


  static geoQuestionFromRaw(raw: RawGeoQuestion) {
    let subject = SubjectFactory.fromRaw(raw.subject);
    return new GeoQuestion(raw._id, subject, raw.range, raw.defaultLocation, raw.answer, raw.type, raw.kind);
  }
}




