import {TimelineUnit} from './../../../common/models/Questions.jsx';

export class TimelineData {

    /**
     * @constructor
     * @param {string} date
     */
    constructor(date) {
        this.date = date;
    }

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
export class TimelineAnswer {
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

export class TimelineVerificationService {

    /**
     * verifies the timeline answer
     *
     * @param {TimelineQuestion} question
     * @param {TimelineAnswer} answer
     * @return {number} 0 for incorrect 1 for correct
     */
    static verifyAnswer(question, answer) {
        switch(question.getUnit()) {
            case TimelineUnit.Day:
                return moment(answer.getData().getDate()).dayOfYear() === moment(question.getAnswer()).dayOfYear()? 1: 0;
                break;

            case TimelineUnit.Week:
                return moment(answer.getData().getDate()).week() === moment(question.getAnswer()).week()? 1: 0;
                break;

            case TimelineUnit.Month:
                return moment(answer.getData().getDate()).month() === moment(question.getAnswer()).month()? 1: 0;

                break;

            case TimelineUnit.Year:
                return moment(answer.getData().getDate()).year() === moment(question.getAnswer()).year()? 1: 0;
                break;

            default:
                throw new Meteor.Error(500, `Unknown unit ${question.getUnit()}`);
        }

    }
};
