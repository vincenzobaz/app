import Question from "../../../common/models/Question";
import {Answer} from "../../../../common/models/questions/answers/Answer";

export interface VerificationService {
  verifyAnswer(question: Question, Answer: Answer): number;
}
