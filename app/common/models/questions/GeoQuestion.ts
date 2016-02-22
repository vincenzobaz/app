import ObjectID = Mongo.ObjectID;
import {RawSubject, Subject} from "./Subject";
import {QuestionType} from "./QuestionType";
import {Kind} from "./Kind";
import {RawQuestion} from "../Question";
import {Marker} from "./Marker";
import {Location} from "./Location";


export interface RawGeoQuestion extends RawQuestion {
  range: number,
  defaultLocation: Location,
  answer: Location,
}

export class GeoQuestion {
  private _answer: Location;
  constructor(
      _id: ObjectID, 
      subject: Subject, 
      public range: number, 
      public defaultLocation: Location,
      answer: Location,
      type: QuestionType,
      kind: Kind) 
  {
    // super(_id, subject, type, kind);
    this._answer = answer;
  }

  get answer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this._answer}`);
    }
    return new Marker(this._answer.latitude, this._answer.longitude);
  }

  static geoQuestionFromRaw(raw: RawGeoQuestion) {
    return new GeoQuestion(raw._id, Subject.fromRaw(raw.subject), raw.range, raw.defaultLocation, raw.answer, raw.type, raw.kind);
  }
}




