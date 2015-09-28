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

    /**
     * @param {Tile} tile
     * @param {[Answer]} answers
     *
     * @return {[number]} the array of the results: 0 for incorrect 1 for correct per question
     */
    static verifyTile(tile, answers) {

        const questionAnswers = _.zip(tile.getQuestions(), answers);
        console.log("ansswers", answers);
        return _.map(questionAnswers, qa => {
            if (qa[0].getKind() === Question.Kind.Timeline){
                return TimelineVerificationService.verifyAnswer(qa[0], qa[1]);
            } else if (qa[0].getKind() === Question.Kind.MultipleChoice){
                return MultipleChoiceVerificationService.verifyAnswer(qa[0], qa[1]);
            } else if (qa[0].getKind() === Question.Kind.Geolocation) {
                console.error("verifying geo", qa[1]);
                return GeoVerificationService.verifyAnswer(qa[0], qa[1]);
            } else if (qa[0].getKind() === Question.Kind.Order) {
                return OrderVerificationService.verifyAnswer(qa[0], qa[1]);
            } else {
                console.error("got invalid question kind " + qa[0].getKind());
                return 0;
            }
        });
    }
};
