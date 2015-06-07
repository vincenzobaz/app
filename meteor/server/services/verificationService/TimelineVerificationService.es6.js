TimelineData = class TimelineData {

    /**
     * @constructor
     * @param {string} date
     */
    constructor(date) {
        this.date = date;
    }
    /**
     * the number chosen as answer
     * @type {String}
     */
    date = new Date();

    /**
     * Gives the date as answer given by the user
     *
     * @return {Date}
     */
    getDate() {
        return new Date(this.date);
    }
}

/**
 * @extends {Answer}
 */
TimelineAnswer = class TimelineAnswer {
    /**
     * @constructor
     * @param {TimelineData}data
     */
    constructor(data) {
        this.data = data
    }
    /**
     * A data object
     * @type {TimelineData}
     */
    getData(){
        return this.data;
    }
}

TimelineVerificationService = class TimelineVerificationService {

    /**
     * verifies the timeline answer
     *
     * @param {TimelineQuestion} question
     * @param {TimelineAnswer} answer
     * @return {number} 0 for incorrect 1 for correct
     */
    static verifyAnswer(question, answer) {
        const answerDate = answer.getData().getDate();
        var min = answer.getData().getDate();
        var max = answer.getData().getDate();
        const threshold = Math.max(question.getThreshold(), 1);
        switch(question.getUnit()) {
            case TimelineUnit.Day:
                console.log(`Timeline: Answer day: ${moment(answer.getData().getDate()).dayOfYear()}
                question day: ${moment(question.getAnswer()).dayOfYear()}`);
                return moment(answer.getData().getDate()).dayOfYear() === moment(question.getAnswer()).dayOfYear()? 1: 0;
                break;

            case TimelineUnit.Week:
                console.log(`Timeline: Answer week: ${moment(answer.getData().getDate()).week()}
                question week: ${moment(question.getAnswer()).week()}`);
                return moment(answer.getData().getDate()).week() === moment(question.getAnswer()).week()? 1: 0;
                break;

            case TimelineUnit.Month:
                console.log(`Timeline: Answer month: ${moment(answer.getData().getDate()).month()}
                question month: ${moment(question.getAnswer()).month()}`);
                return moment(answer.getData().getDate()).month() === moment(question.getAnswer()).month()? 1: 0;

                break;

            case TimelineUnit.Year:
                console.log(`Timeline: Answer year: ${moment(answer.getData().getDate()).year()}
                question year: ${moment(question.getAnswer()).year()}`);
                return moment(answer.getData().getDate()).year() === moment(question.getAnswer()).year()? 1: 0;
                break;

            default:
                throw new Meteor.Error(500, `Unknown unit ${question.getUnit()}`);
        }

        return 0;

    }
};
