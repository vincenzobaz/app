
import { TimelineData } from "./TimelineData";
import {Answer} from "./Answer";

export class TimelineAnswer extends Answer {
  /**
   * @constructor
   * @param {TimelineData}data
   */
  constructor(public data: TimelineData) {
    super();
    this.data = data
  }
}
