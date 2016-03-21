import {RawQuestion, default as Question} from "../Question";
import {MultipleChoiceQuestion, RawMultipleChoiceQuestion} from "./multiplechoice/MultipleChoiceQuestion";
import {TimelineQuestion, RawTimelineQuestion} from "./timeline/TimeLineQuestion";
import {OrderQuestion, RawOrderQuestion} from "./order/OrderQuestion";
import {GeoQuestion, RawGeoQuestion} from "./geolocation/GeoQuestion";
import {KIND, Kind} from "./common/Kind";
import {SUBJECT_TYPE} from "./common/SubjectType";


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

