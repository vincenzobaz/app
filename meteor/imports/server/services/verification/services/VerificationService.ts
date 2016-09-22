import {Answer} from "../../../../common/models/questions/answers/Answer";
import Question from "../../../../common/models/Question";

export interface VerificationService {
  verifyAnswer(question: Question, Answer: Answer): number;
}
