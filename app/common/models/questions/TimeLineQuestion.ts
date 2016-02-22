import ObjectID = Mongo.ObjectID;
import {RawSubject, Subject} from "./Subject";
import {QuestionType} from "./QuestionType";
import {Kind} from "./Kind";
import {RawQuestion, default as Question} from "../Question";
var stuff = require("../Question");

console.log(stuff);

export type TimelineUnit = "Day" | "Week" | "Month" | "Year"

export const TimelineUnit = {
  Day: 'Day' as TimelineUnit,
  Week: 'Week' as TimelineUnit,
  Month: 'Month' as TimelineUnit,
  Year: 'Year' as TimelineUnit
};

export interface RawTimelineQuestion extends RawQuestion {
  min: Date;
  max: Date;
  initialDate: Date;
  unit: TimelineUnit;
  step: number;
  threshold: number;
  answer: Date;
}

export class TimelineQuestion extends Question {
  private _answer:Date;

  constructor(public _id:ObjectID,
              public subject:Subject,
              public min:Date,
              public max:Date,
              public initialDate:Date,
              public unit:TimelineUnit,
              public step:number,
              public threshold:number,
              answer:Date,
              public type:QuestionType,
              public kind:Kind) 
  {
    super(_id, subject, type, kind);
    this._answer = answer;
  }

  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this._answer}`);
    }

    return this._answer;
  }

  static timelineFromRaw(data:RawTimelineQuestion) {
  // let subject:Subject = new Subject();//Subject.fromRaw(data.subject);
  console.log("we are creatining a timeline from raw");
  return new TimelineQuestion(
      // data._id,
      "miau",
      null,
      data.min,
      data.max,
      data.initialDate,
      data.unit,
      data.step,
      data.threshold,
      data.answer,
      data.type,
      data.kind
  );
};
}
