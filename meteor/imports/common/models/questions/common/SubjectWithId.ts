export class SubjectWithId {
    private _subject: any;
    private _uId: string;
    /**
     *
     * @param {QuestionSubject} subject
     * @param {string} uId
     */
    constructor(subject: any, uId: string) {
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