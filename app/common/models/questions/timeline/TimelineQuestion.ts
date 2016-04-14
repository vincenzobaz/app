import {RawSubject, Subject} from "./../common/Subject";
import {QuestionType} from "./../common/QuestionType";
import {KIND, Kind} from "./../common/Kind";
import {RawQuestion, default as Question} from "../../Question";
import {TimelineUnit, TIMELINE_UNIT} from "./TimelineUnit";
import {SubjectFactory} from "./../common/SubjectFactory";
const moment = require('moment');
import * as _ from "lodash";
import {Moment} from "moment";
import {TimelineAnswer} from "../answers/TimelineAnswer";


export interface RawTimelineQuestion extends RawQuestion {
  min: Date;
  max: Date;
  initialDate: Date;
  unit: TimelineUnit;
  step: number;
  threshold: number;
  answer: string;
  userAnswer?: TimelineAnswer;
  dates?: Date[],
  before?: number,
  after?: number
}

export class TimelineQuestion extends Question {
  public numberOfChoices: number = 3;
  public dates: Date[];
  public before: number;
  public after: number;

  constructor(public _id: string | Mongo.ObjectID,
              public subject: Subject,
              public min: Date,
              public max: Date,
              public initialDate: Date,
              public unit: TimelineUnit,
              public step: number,
              public threshold: number,
              public answer: string,
              public userAnswer: TimelineAnswer,
              type: QuestionType,
              kind: Kind,
              dates?: Date[],
              before?: number,
              after?: number) {
    super(_id, subject, type, kind);
    if (!dates) {
      let otherChoices = this.numberOfChoices - 1;
      let lower: number = _.random(otherChoices);
      let upper: number = otherChoices - lower;
      const actualSteps = step - 1;
      this.before = _.random(0, actualSteps);
      this.after = (actualSteps) - this.before;
      let counter = 0;
      while (moment(new Date()) < moment(answer).add(upper).add(this.after) && counter < 100) {
        upper--;
        lower--;
        counter++;
      }

      if (counter >= 100) {
        throw new Meteor.Error("We reached maximum iterations for TimelineQuestion generation");
      }
      let lowerMoments = _.rangeRight(1, lower + 1).map((i) => {
        return moment(answer).subtract(step * i, unit).toDate()
      });
      let upperMoments = _.range(1, upper + 1).map((i) => {
        return moment(answer).add(step * i, unit).toDate()
      });
      this.dates = (lowerMoments.concat([moment(answer).toDate()])).concat(upperMoments);

    } else {
      this.dates = dates;
      this.before = before;
      this.after = after;
    }

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
        data.userAnswer,
        data.type,
        data.kind,
        data.dates,
        data.before,
        data.after
    );
  };
}
