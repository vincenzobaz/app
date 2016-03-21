import {SubjectType} from "../../../../common/models/questions/common/SubjectType";
import {Subject} from "../../../../common/models/questions/common/Subject";
import {Choice} from "../../../../common/models/questions/multiplechoice/Choice";
import {Marker} from "../../../../common/models/questions/geolocation/Marker";
import {Item} from "../../../../common/models/questions/common/Item";
import {TimelineUnit} from "../../../../common/models/questions/timeline/TimelineUnit";

export interface QuestionProps {
  onDone: Function;
  type: SubjectType;
  subject?: Subject;
  choices?: Choice[];
  defaultLocation?: Marker;
  items?: Item[];
  renderItem?: any;
  max?: string;
  min?: string;
  step?: number;
  initialDate?: string;
  unit?: TimelineUnit;

}
