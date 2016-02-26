
import * as moment from "moment/moment";
import { TimelineQuestion, TimelineUnit } from "../../../common/models/questions/TimeLineQuestion";
import { TimelineAnswer } from "./TimelineAnswer";


export default class TimelineVerificationService {

    /**
     * verifies the timeline answer
     *
     * @param {TimelineQuestion} question
     * @param {TimelineAnswer} answer
     * @return {number} 0 for incorrect 1 for correct
     */
    static verifyAnswer(question: TimelineQuestion, answer: TimelineAnswer) {
        switch(question.unit) {
            case TimelineUnit.Day:
                return moment(answer.data.date).dayOfYear() === moment(question.getAnswer()).dayOfYear()? 1: 0;
            case TimelineUnit.Week:
                return moment(answer.data.date).week() === moment(question.getAnswer()).week()? 1: 0;
            case TimelineUnit.Month:
                return moment(answer.data.date).month() === moment(question.getAnswer()).month()? 1: 0;
            case TimelineUnit.Year:
                return moment(answer.data.date).year() === moment(question.getAnswer()).year()? 1: 0;
            default:
                throw new Meteor.Error(500, `Unknown unit ${question.unit}`);
        }

    }
}
