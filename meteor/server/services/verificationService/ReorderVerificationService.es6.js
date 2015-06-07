
OrderItem = class OrderItem {

    /**
     *
     * @param {number} id
     * @param {string} title
     */
    constructor(id, title) {
        this._id = id;
        this._title = title;
    }

    /**
     *
     * @returns {number}
     */

    get id() {
        return this._id;
    }

    /**
     *
     * @returns {string}
     */

    get title() {
        return this._title;
    }
}

OrderData = class OrderData {

    /**
     *
     * @param {[OrderItem]} items
     */
    constructor(items) {
        this._items = items;
    }

    /**
     * Contains the marker put by the user
     * @type {[OrderItem]}
     */
    get items() {
        return this._items;
    }
}

/**
 * @extends {Answer}
 */
OrderAnswer = class OrderAnswer {

    /**
     *
     * @param {number} timespent timespent in ms
     * @param {OrderData} data
     */
    constructor(timespent, data) {
        this._timespent = timespent;
        this._data = data;
    }

    /**
     * A data object
     * @type {OrderData}
     */
    get data() {
        return this._data;
    }
};

OrderVerificationService = {
    /**
     * verifies if the answer provided is at the correct location
     *
     * @param {OrderQuestion} question
     * @param {OrderAnswer} answer
     *
     * @return {number} 1 for correct answer 0 for incorrect
     */

        verifyAnswer(question, answer)  {

        const answerNumber = _.map(answer.data.items, (i) => i.id);
        const correct = _.reduce(
            _.zip(question.getAnswer(), answerNumber), (memo, qa) => {
                console.log(`the answer is ${qa[0]}, chosen ${qa[1]}`);
                return memo + (qa[0] === qa[1]? 1 : 0);
            }, 0);

        console.log(`Correctly ordered ${correct} number of thingys`);
        return correct === 4? 1 : 0;
    }
};
