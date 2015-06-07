OrderQuestionProps = ['_id', 'subject', 'choices', 'answer', 'type', 'kind'];


SubjectWithId = class SubjectWithId {
    /**
     *
     * @param {QuestionSubject} subject
     * @param {string} uId
     */
    constructor(subject, uId) {
        this._subject = subject;
        this._uId = uId;
    }

    /**
     *
     * @returns {QuestionSubject}
     */

    get subject() {
        return this._subject;
    }

    /**
     *
     * @returns {string}
     */
    get uId() {
        return this._uId;
    }
};

OrderQuestion = class OrderQuestion {


    constructor(props) {
        const diff = _.difference(_.without(Object.keys(props), 'userId'), OrderQuestionProps);
        if (!_.isEmpty(diff)) {
            throw new Meteor.Error(500, "OrderQuestion constructor with unusable parameters " + diff);
        }
        assignProps(this, GeoQuestionProps, props);
    }

    /**
     * retunrs the Question id
     * @returns {string}
     */
    getId() {
        return this._id;
    }

    /**
     *
     * @returns {Subject}
     */

    getSubject() {
        return this.subject;
    }

    getType() {
        return this.type;
    }

    /**
     * returns an array of SubjectWithIds
     * @returns {[SubjectWithId]}
     */
    choices() {
        return this.choices;
    }



    getKind() {
        return this.kind;
    }

    /**
     * returns the correct id of the answers
     * @returns {[number]}
     */
    getAnswer() {
        if (!Meteor.isServer) {
            throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
        }

        return this.answer;
    }

    static fromRaw(raw) {
        return new OrderQuestion(raw);
    }
};
