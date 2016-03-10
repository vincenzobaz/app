


import { MultipleChoiceVerificationService } from "./MultipleChoiceVerificationService";
import GeoVerificationService from "./GeoVerificationService";
import { OrderVerificationService } from "./ReorderVerificationService";
import Question from "../../../common/models/Question";
import TimelineVerificationService from "./TimelineVerificationService";
import {KIND} from "../../../common/models/questions/Kind";
import {QuestionProps} from "../../../client/scripts/components/questions/QuestionProps";
import {indexArray} from "../../../common/helpers/indexedArray";
import {Tile} from "../../../common/models/Tile";

export class Answer {
  public data: any;
  public timespent: number;
}

export class AnswerVerificationService {

    static getVerifiers() {
      const verifiers = {};

      verifiers[KIND.Timeline]       = TimelineVerificationService;
      verifiers[KIND.MultipleChoice] = MultipleChoiceVerificationService;
      verifiers[KIND.Geolocation]    = GeoVerificationService;
      verifiers[KIND.Order]          = OrderVerificationService;

      return verifiers;
    }

    static getVerifier(kind) {
      const verifiers = AnswerVerificationService.getVerifiers();
      const verifier  = verifiers[kind];

      if (!AnswerVerificationService.isVerifier(verifier)) {
        return null;
      }

      return verifier;
    }

    /**
     * @param {Tile} tile
     * @param {[Answer]} answers
     *
     * @return {[number]} the array of the results: 0 for incorrect 1 for correct per question
     */
    static verifyTile(tile: Tile, answers) {
        const questionAnswers = _.zip(tile.questions, answers);

        return _.map(questionAnswers, (qa) => {
          const kind     = (<Question>qa[0]).kind;
          const verifier = AnswerVerificationService.getVerifier(kind);

          if (verifier == null) {
            console.error(`AnswerVerificationService: Got invalid question kind: ${kind}`);
            return 0;
          }

          return verifier.verifyAnswer(qa[0], qa[1]);
        });
    }

    static isVerifier(verifier) {
      return (
        verifier != null &&
        typeof verifier.verifyAnswer == 'function'
      );
    }
}

interface QuestionAnswer {}

