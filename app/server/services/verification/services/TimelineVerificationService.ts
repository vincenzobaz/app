

import {TimelineQuestion} from "../../../../common/models/questions/timeline/TimelineQuestion";
import {TimelineAnswer} from "../../../../common/models/questions/answers/TimelineAnswer";
import {TIMELINE_UNIT} from "../../../../common/models/questions/timeline/TimelineUnit";
var moment = require("moment");

export class TimelineVerificationService {

    /**
     * verifies the timeline answer
     *
     * @param {TimelineQuestion} question
     * @param {TimelineAnswer} answer
     * @return {number} 0 for incorrect 1 for correct
     */
    static verifyAnswer(question: TimelineQuestion, answer: TimelineAnswer): number {
        switch(question.unit) {
            case TIMELINE_UNIT.Day:
                return moment(answer.data.date).dayOfYear() == moment(question.getAnswer()).dayOfYear()? 1: 0;
            case TIMELINE_UNIT.Week:
                return moment(answer.data.date).week() == moment(question.getAnswer()).week()? 1: 0;
            case TIMELINE_UNIT.Month:
                return moment(answer.data.date).month() == moment(question.getAnswer()).month()? 1: 0;
            case TIMELINE_UNIT.Year:
                return moment(answer.data.date).year() == moment(question.getAnswer()).year()? 1: 0;
            default:
                throw new Meteor.Error('500', `Unknown unit ${question.unit}`);
        }

    }
}
