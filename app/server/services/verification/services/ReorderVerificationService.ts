import {OrderQuestion} from "../../../../common/models/questions/order/OrderQuestion";
import {OrderAnswer} from "../../../../common/models/questions/answers/OrderAnswer";
import {Item} from "../../../../common/models/questions/common/Item";
import * as _ from 'lodash';


export class OrderVerificationService {

  /**
   * Verifies if the answer provided is at the correct location
   *
   * @param {OrderQuestion} question
   * @param {OrderAnswer} userAnswer
   *
   * @return {number}
   */
  static verifyAnswer(question: OrderQuestion, userAnswer: OrderAnswer): number {
    const answers: number[] = question.answer;
    
    const right = _.range(answers.length).map((i: number) => {return answers[i] == userAnswer.data.items[i].id ? 1 : 0});
    const correct = right.reduce((acc, cur) => acc + cur, 0);
    const numAnswers = question.answer.length;

    return correct == numAnswers ? 1 : 0;
  }

}
;
