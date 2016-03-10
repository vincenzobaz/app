import {RawSubject, Subject} from "./Subject";
import {QuestionType} from "./QuestionType";
import {KIND, Kind} from "./Kind";
import {RawQuestion, default as Question} from "../Question";
import {TimelineUnit} from "./TimelineUnit";
import {SubjectFactory} from "./SubjectFactory";



export interface RawTimelineQuestion extends RawQuestion {
  min: Date;
  max: Date;
  initialDate: Date;
  unit: TimelineUnit;
  step: number;
  threshold: number;
  answer: string;
}

export class TimelineQuestion extends Question {

  constructor(public _id: string | Mongo.ObjectID,
              public subject: Subject,
              public min: Date,
              public max: Date,
              public initialDate: Date,
              public unit: TimelineUnit,
              public step: number,
              public threshold: number,
              public answer: string,
              type: QuestionType,
              kind: Kind) {
    super(_id, subject, type, kind);
  }

  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }

    return this.answer;
  }

  static timelineFromRaw(data: RawTimelineQuestion) {
    let subject: Subject = SubjectFactory.fromRaw(data.subject);
    if (!data._id) {
      data._id = new Mongo.ObjectID();
    }
    return new TimelineQuestion(
        data._id,
        subject,
        data.min,
        data.max,
        data.initialDate || data['default'],
        data.unit,
        data.step,
        data.threshold,
        data.answer,
        data.type,
        data.kind
    );
  };
}
