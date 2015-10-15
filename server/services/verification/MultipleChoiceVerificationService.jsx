MultipleChoiceData = class MultipleChoiceData {

    choice;

    /**
     * @constructor
     * @param {number} choice
     */
    constructor(choice) {
        this.choice = choice;
    }


    /**
     * the number chosen as answer
     * @type {number}
     */
    getChoice() {
        return this.choice;
    }
}

/**
 * @extends {Answer}
 */
MultipleChoiceAnswer = class MultipleChoiceAnswer {
    /**
     * @constructor
     * @param {MultipleChoiceData} data
     */
    constructor(data) {
        this.data = data;
    }
    /**
     * A data object
     * @type {MultipleChoiceData}
     */
    getData(){
        return this.data;
    }
}



MultipleChoiceVerificationService = class MultipleChoiceVerificationService {

    /**
     *
     * @param {MultipleChoiceQuestion} question
     * @param {MultipleChoiceAnswer} answer
     * @returns {number}
     */
    static verifyAnswer(question, answer) {
        console.log('multiple choice answer: %d ', question.getAnswer(), answer.getData().getChoice());
        return question.getAnswer() === answer.getData().getChoice() ? 1 : 0;
    }

};
