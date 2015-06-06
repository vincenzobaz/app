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
        const threshold = question.getThreshold();

        switch(question.getUnit()) {
            case TimelineUnit.Day:
                min = new Date(question.getAnswer()).adjustDateDays(-threshold);
                max = new Date(question.getAnswer()).adjustDateDays(threshold);
                break;

            case TimelineUnit.Week:
                min = new Date(question.getAnswer).adjustDateWeek(-threshold);
                max = new Date(question.getAnswer).adjustDateWeek(threshold);
                break;

            case TimelineUnit.Month:
                min = new Date(question.getAnswer).adjustDateMonth(-threshold);
                max = new Date(question.getAnswer).adjustDateMonth(threshold);
                break;

            case TimelineUnit.Year:
                min = new Date(question.getAnswer).adjustDateYear(-threshold);
                max = new Date(question.getAnswer).adjustDateYear(threshold);
                break;

            default:
                throw new Meteor.Error(500, `Unknown unit ${question.getUnit()}`);
        }

        console.log(`min: ${min}, max: ${max}, answer: ${answerDate} =>`, answer);

        return min.getTime() <= answerDate.getTime() && answerDate <= max.getTime() ? 1 : 0;

    }
};
