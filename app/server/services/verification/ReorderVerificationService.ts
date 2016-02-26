

import { OrderQuestion } from "../../../common/models/questions/OrderQuestion";
import { OrderAnswer } from "./OrderAnswer";
import { OrderItem } from "./OrderItem";



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
        const givenIds   = answer.data.items.map((i: OrderItem) => i._id);
        const answerIds  = question.answer;
        const right      = _.zip(answerIds, givenIds).map(([answer, given]) => answer === given ? 1 : 0);
        const correct    = right.reduce((acc, cur) => acc + cur, 0);
        const numAnswers = answerIds.length;

        console.log(`OrderVerificationService: got ${correct} correct answers over ${numAnswers}`);

        return correct === numAnswers;
    }

};
