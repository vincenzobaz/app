
export class OrderItem {

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

export class OrderData {

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
export class OrderAnswer {

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
}

export const OrderVerificationService = {

  /**
   * Verifies if the answer provided is at the correct location
   *
   * @param {OrderQuestion} question
   * @param {OrderAnswer} answer
   *
   * @return {boolean}
   */
  verifyAnswer(question, answer)
  {
        const givenIds   = answer.data.items.map(i => i.id);
        const answerIds  = question.getAnswer();
        const right      = _.zip(answerIds, givenIds).map(([answer, given]) => answer === given ? 1 : 0);
        const correct    = right.reduce((acc, cur) => acc + cur, 0);
        const numAnswers = answerIds.length;

        console.log(`OrderVerificationService: got ${correct} correct answers over ${numAnswers}`);

        return correct === numAnswers;
    }

};
