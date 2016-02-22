export class MultipleChoiceData {
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
export class MultipleChoiceAnswer {
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



export const MultipleChoiceVerificationService = {

    /**
     *
     * @param {MultipleChoiceQuestion} question
     * @param {MultipleChoiceAnswer} answer
     * @returns {number}
     */
    verifyAnswer(question, answer) {
        return question.getAnswer() === answer.getData().getChoice() ? 1 : 0;
    }

};
