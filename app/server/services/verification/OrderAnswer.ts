import { OrderData } from "./OrderData";
import { Answer } from "./AnswerVerificationService";
export class OrderAnswer extends Answer {

  /**
   *
   * @param {number} timespent timespent in ms
   * @param {OrderData} data
   */
  constructor(public timespent: number, public data: OrderData)
  {
    super();
  }
}
