
class Answer {
    /**
     * The time spend to answer the question in ms
     * @type {number}
     */
    timeSpent;

    /**
     * A data object
     * @type {any}
     */
    data;
}

AnswerVerificationService = class AnswerVerificationService {

    static getVerifiers() {
      const verifiers = {};

      verifiers[Question.Kind.Timeline]       = TimelineVerificationService;
      verifiers[Question.Kind.MultipleChoice] = MultipleChoiceVerificationService;
      verifiers[Question.Kind.Geolocation]    = GeoVerificationService;
      verifiers[Question.Kind.Order]          = OrderVerificationService;

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
    static verifyTile(tile, answers) {
        const questionAnswers = _.zip(tile.getQuestions(), answers);

        return _.map(questionAnswers, qa => {
          const kind     = qa[0].getKind();
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
        typeof verifier.verifyAnswer === 'function'
      );
    }
};

