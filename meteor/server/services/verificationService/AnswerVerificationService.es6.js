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
        if (tile.type === "MultipleChoice"){
            return _.map(questionAnswers, qa => MultipleChoiceVerificationService.verifyAnswer(qa[0], qa[1]));
        } else if (tile.type === "Timeline"){
            return _.map(questionAnswers, qa => TimelineVerificationService.verifyAnswer(qa[0], qa[1]));
        } else if (tile.type === "Geolocation"){
            return _.map(questionAnswers, qa => GeoVerificationService.verifyAnswer(qa[0], qa[1]));
        } else if (tile.type === "Misc"){
            return _.map(questionAnswers, qa => {
                if (qa[0].getKind() === "Timeline"){
                    return TimelineVerificationService.verifyAnswer(qa[0], qa[1]);
                } else if (qa[0].getKind() === "MultipleChoice"){
                    return MultipleChoiceVerificationService.verifyAnswer(qa[0], qa[1]);
                } else if (qa[0].getKind() === "Geolocation") {
                    return GeoVerificationService.verifyAnswer(qa[0], qa[1]);
                } else {
                    console.log("got invalid question kind " + qa[0].getKind());
                    return true;
                }
            });
        } else {
            throw new Meteor.Error(500, `Invalid question type: '${tile.type}'`);
        }
  }
}
