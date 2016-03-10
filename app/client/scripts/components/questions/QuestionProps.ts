import {SubjectType} from "../../../../common/models/questions/SubjectType";
import {Subject} from "../../../../common/models/questions/Subject";
import {Choice} from "../../../../common/models/questions/Choice";
import {Marker} from "../../../../common/models/questions/Marker";
import {Item} from "../../../../common/models/questions/Item";
import {TimelineUnit} from "../../../../common/models/questions/TimelineUnit";

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
