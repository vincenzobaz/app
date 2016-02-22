import {assignProps} from './../../common/helpers/assignProps.jsx';
import {OrderQuestion} from './questions/OrderQuestion';
import {Marker} from './questions/Marker'


const Subject = {
  fromRaw(doc) {
    return doc;
  }
};

const ChoiceProps = ['text', 'imageUrl', 'fbId', 'pageId'];

export class Choice {

  constructor(props) {
    assignProps(this, ChoiceProps, props);
  }

  getText() {
    return this.text;
  }

  getImageUrl() {
    return this.imageUrl;
  }

  getFbId() {
    return this.fbId;
  }

  getPageId() {
    return this.pageId;
  }

  static fromRaw(data) {
    return new Choice({
      text: data.text || data.name,
      fbId: data.fbId || data.fb_id,
      pageId: data.pageId || data.page_id,
      imageUrl: data.imageUrl || data.image_url
    });
  };
}


const MultipleChoiceQuestionProps = ['_id', 'subject', 'choices', 'answer', 'type', 'kind'];

export class MultipleChoiceQuestion {

  constructor(props) {
    assignProps(this, MultipleChoiceQuestionProps, props);
  }

  getId() {
    return this._id;
  }

  getSubject() {
    return this.subject;
  }

  getType() {
    return this.type;
  }

  getKind() {
    return this.kind;
  }

  getChoices() {
    return this.choices;
  }

  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }

    return this.answer;
  }

  static fromRaw(data) {
    data.choices = _.map(data.choices, c =>
        Choice.fromRaw(c));
    data.subject = Subject.fromRaw(data.subject);
    return new MultipleChoiceQuestion(data);
  }
}


export const TimelineUnit = {
  Day: 'Day',
  Week: 'Week',
  Month: 'Month',
  Year: 'Year'
};

const TimelineQuestionProps = ['_id', 'subject', 'min', 'max', 'default', 'unit',
  'step', 'threshold', 'answer', 'type', 'kind'];

export class TimelineQuestion {

  constructor(props) {
    assignProps(this, TimelineQuestionProps, props);
  }

  getId() {
    return this._id;
  }

  getType() {
    return this.type;
  }

  getKind() {
    return this.kind;
  }

  getSubject() {
    return this.subject;
  }

  getMin() {
    return this.min;
  }

  getMax() {
    return this.max;
  }

  getStep() {
    return this.step;
  }

  getUnit() {
    return this.unit;
  }

  getThreshold() {
    return this.threshold;
  }

  getDefault() {
    return this.default;
  }

  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }

    return this.answer;
  }

  static fromRaw(data) {
    data.subject = Subject.fromRaw(data.subject);
    return new TimelineQuestion(data);
  };
}
;


const GeoQuestionProps = ['_id', 'subject', 'range', 'defaultLocation', 'answer', 'type', 'kind'];

export class GeoQuestion {
  constructor(props) {
    assignProps(this, GeoQuestionProps, props);
  }

  getId() {
    return this._id;
  }

  /**
   *
   * @returns {Subject}
   */

  getSubject() {
    return this.subject;
  }

  getType() {
    return this.type;
  }

  /**
   * The allowed distance which is still considered correct
   * @returns {number}
   */
  getRange() {
    return this.range;
  }

  /**
   *
   * @returns {Marker}
   */
  getDefaultLocation() {
    return this.defaultLocation;
  }


  getKind() {
    return this.kind;
  }

  //TODO: Improve the creation through props to properly show types, create a constructor
  /**
   * @return {Marker}
   */
  getAnswer() {
    if (!Meteor.isServer) {
      throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
    }
    return new Marker(this.answer.latitude, this.answer.longitude);
  }

  static fromRaw(raw) {
    return new GeoQuestion(raw);
  }
}
;


export class Question {
  static getQuestionFromType(kind) {
    switch (kind) {
      case Kind.MultipleChoice:
        return MultipleChoiceQuestion;
      case Kind.Timeline:
        return TimelineQuestion;
      case Kind.Order:
        return OrderQuestion;
      case Kind.Geolocation:
        return GeoQuestion;
      default:
        Meteor.Error(404, `Unknown question kind: ${kind}`);
    }

  }


  
  static fromRaw(tile, data) {
    const kind = data.kind;
    if (kind == null) {
      throw new Meteor.Error(500, `Unknown question kind: ${data.kind}`);
    }

    const Constructor = Question.getQuestionFromType(kind);
    if (Constructor == null) {
      throw new Meteor.Error(500, `Cannot find constructor for question of kind ${kind}`);
    }

    return Constructor.fromRaw(data);
  };


}
;

export const Kind = {
  MultipleChoice: 'MultipleChoice',
  Timeline: 'Timeline',
  Geolocation: 'Geolocation',
  Order: 'Order'
};


