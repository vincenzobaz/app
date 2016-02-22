import {RawQuestion} from "../Question";
import {Subject} from "./Subject";
import {QuestionType} from "./QuestionType";
import {Kind} from "./Kind";
import {MultipleChoiceQuestion, RawMultipleChoiceQuestion} from "./MultipleChoiceQuestion";
import {TimelineQuestion, RawTimelineQuestion} from "./TimeLineQuestion";
import {OrderQuestion, RawOrderQuestion} from "./OrderQuestion";
import {GeoQuestion, RawGeoQuestion} from "./GeoQuestion";

export function questionFromRaw(raw: RawQuestion): any {
  console.log("we call the static method of Question");
  const kind = raw.kind;

  switch (kind) {
    case Kind.MultipleChoice:
      return MultipleChoiceQuestion.multipleChoiceFromRaw(<RawMultipleChoiceQuestion>raw);
    case Kind.Timeline:
      return TimelineQuestion.timelineFromRaw(<RawTimelineQuestion>raw);
    case Kind.Order:
      return OrderQuestion.orderQustionFromRaw(<RawOrderQuestion>raw);
    case Kind.Geolocation:
      return GeoQuestion.geoQuestionFromRaw(<RawGeoQuestion>raw);
    default:
          throw new Meteor.Error(404, `Unknown question kind: ${kind}`);
  }
}
