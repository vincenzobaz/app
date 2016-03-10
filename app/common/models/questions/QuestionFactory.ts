import {RawQuestion, default as Question} from "../Question";
import {MultipleChoiceQuestion, RawMultipleChoiceQuestion} from "./MultipleChoiceQuestion";
import {TimelineQuestion, RawTimelineQuestion} from "./TimeLineQuestion";
import {OrderQuestion, RawOrderQuestion} from "./OrderQuestion";
import {GeoQuestion, RawGeoQuestion} from "./GeoQuestion";
import {KIND, Kind} from "./Kind";
import {SUBJECT_TYPE} from "./SubjectType";


export module QuestionFactory {
  
  export function questionFromRaw(raw: RawQuestion): Question {
    const kind = raw.kind;
    switch (kind) {
      case KIND.MultipleChoice:
        return MultipleChoiceQuestion.multipleChoiceFromRaw(<RawMultipleChoiceQuestion>raw);
      case KIND.Timeline:
        return TimelineQuestion.timelineFromRaw(<RawTimelineQuestion>raw);
      case KIND.Order:
        return OrderQuestion.orderQustionFromRaw(<RawOrderQuestion>raw);
      case KIND.Geolocation:
        return GeoQuestion.geoQuestionFromRaw(<RawGeoQuestion>raw);
    }
    throw new Meteor.Error('404', `Unknown question kind: ${kind}`);

  }
  
  export function  doesQuestionExist(kind: Kind): boolean {
    switch (kind) {
      case KIND.MultipleChoice:
      case KIND.Timeline:
      case KIND.Order:
      case KIND.Geolocation:
        return true;
    }
    return false;
  }
}

