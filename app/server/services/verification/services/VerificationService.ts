import Question from "../../../common/models/Question";
import {Answer} from "../answers/Answer";

export interface VerificationService {
  verifyAnswer(question: Question, Answer: Answer): number;
}
