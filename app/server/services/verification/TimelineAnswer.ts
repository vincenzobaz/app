
import { TimelineData } from "./TimelineData";
import { Answer } from "./AnswerVerificationService";

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
