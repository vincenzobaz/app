import {MultipleChoiceVerificationService} from "./services/MultipleChoiceVerificationService";
import {OrderVerificationService} from "./services/ReorderVerificationService";
import Question from "../../../common/models/Question";
import {KIND} from "../../../common/models/questions/common/Kind";
import {Tile} from "../../../common/models/Tile";
import {VerificationService} from "./services/VerificationService";
import {Answer} from "./../../../common/models/questions/answers/Answer";
import {GeoVerificationService} from "./services/GeoVerificationService";
import {TimelineVerificationService} from "./services/TimelineVerificationService";


export class AnswerVerificationService {


  static getVerifier(kind): VerificationService {
    switch (kind) {
      case KIND.Timeline:
        return TimelineVerificationService;
      case KIND.MultipleChoice:
        return MultipleChoiceVerificationService;
      case KIND.Geolocation:
        return GeoVerificationService;
      case KIND.Order:
        return OrderVerificationService;

    }
  }

  /**
   * @param {Tile} tile
   * @param {[Answer]} answers
   *
   * @return {[number]} the array of the results: 0 for incorrect 1 for correct per question
   */
  static verifyTile(tile: Tile, answers) {

    return answers.map((answer: Answer, i: number) => {
      const question: Question = tile.questions[i];
      const kind = question.kind;
      const verifier = AnswerVerificationService.getVerifier(kind);
      if (verifier == null) {
        console.error(`AnswerVerificationService: Got invalid question kind: ${kind}`);
        return 0;
      }

      return verifier.verifyAnswer(question, answer);

    });
  }


}

