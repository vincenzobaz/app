
export class QuestionPageSubject {

    private _name: string;
    private _pageId: string;
    private _photoUrl: string;
    private _type: string;

    constructor(name: string, pageId: string, photoUrl: string, type: string) {
     this._name = name;
        this._pageId = pageId;
        this._photoUrl = photoUrl;
        this._type = type;
    }

    /**
     * return the name of the page
     * @returns {string}
     */
    getName() {
        return this._name;
    }
t
    /**
     * returns the pageId
     * @returns {string}
     */
    getPageId() {
        return this._pageId;
    }

    /**
     * retunrs the photo url
     * @returns {string}
     */
    getPhotoUrl() {
        return this._photoUrl;
    }

    /**
     * returns the type
     *
     * @returns {string}
     */
    getType() {
        return this._type;
    }

};
