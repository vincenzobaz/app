OrderQuestionProps = ['_id', 'subject', 'choices', 'answer', 'type', 'kind', 'items'];


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

let SubjectTypes = {
    TextPost: 'TextPost',
    ImagePost: 'ImagePost',
    VideoPost: 'VideoPost',
    LinkPost: 'LinkPost',
    Comment: 'Comment',
    Page: 'Page'

};

OrderQuestion = class OrderQuestion {


    constructor(props) {
        const diff = _.difference(_.without(Object.keys(props), 'userId'), OrderQuestionProps);
        if (!_.isEmpty(diff)) {
            throw new Meteor.Error(500, "OrderQuestion constructor with unusable parameters " + diff);
        }
        assignProps(this, OrderQuestionProps, props);
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

    getItems() {
        return this.items;
    }

    /**
     * returns an array of SubjectWithIds
     * @returns {[SubjectWithId]}
     */
    getChoices() {
        return this.choices;
    }

    setChoices(value) {
        this.choices = value;
        this.items = _.map(value, c => {
            switch (c.subject.type) {
                case SubjectTypes.Page:
                    return {id: c.uId, text: c.subject.name, subject:c.subject};
                    break;
                case SubjectTypes.TextPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                    break;
                case SubjectTypes.ImagePost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                    break;
                case SubjectTypes.VideoPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                    break;
                case SubjectTypes.LinkPost:
                    return {id: c.uId, text: c.subject.text, subject:c.subject};
                    break;
                case SubjectTypes.Comment:
                    return {id: c.uId, text: c.subject.comment, subject:c.subject};
                    break;
                default:
                    console.error("Ordering subject type not defined: " + c.type);
                    Meteor.Error(500, "Ordering subject type not defined: " + c.type);
            }
        });
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
