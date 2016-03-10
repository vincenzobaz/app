

import { OrderQuestion } from "../../../common/models/questions/OrderQuestion";
import { OrderAnswer } from "./OrderAnswer";
import {Item} from "../../../common/models/questions/Item";



export const OrderVerificationService = {

  /**
   * Verifies if the answer provided is at the correct location
   *
   * @param {OrderQuestion} question
   * @param {OrderAnswer} answer
   *
   * @return {boolean}
   */
  verifyAnswer(question: OrderQuestion, answer: OrderAnswer)
  {
        const right      = _.zip(question.answer, answer.data.items).map(([answer, given]) => {return answer.toString() == (<Item>given).id ? 1 : 0});
        const correct    = right.reduce((acc, cur) => acc + cur, 0);
        const numAnswers = question.answer.length;

        console.log(`OrderVerificationService: got ${correct} correct answers over ${numAnswers}`);

        return correct == numAnswers;
    }

};
