//TODO: Properly define the subjects depending on the type and create a creator map

QuestionSubjectProps = [ 'name', 'subject', 'range', 'defaultPosition', 'answer', 'type', 'kind' ];


QuestionPageSubjectProps = ['name', 'pageId', 'photoUrl', 'type'];

QuestionPageSubject = class QuestionPageSubject {

    /**
     * creates a QuestionPageSubject
     * @param {[string]} props array with stirng of name, pageId, photoUrl, type
     */

    constructor(props) {
        const diff = _.difference(Object.keys(props), QuestionPageSubjectProps);
        if (!_.isEmpty(diff)){
            throw new Meteor.Error(500, "QuestionPageSubject constructor with unusable parameters " + diff);
        }
        assignProps(this, QuestionPageSubjectProps, props);
    }

    /**
     * return the name of the page
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * returns the pageId
     * @returns {string}
     */
    getPageId() {
        return this.pageId;
    }

    /**
     * retunrs the photo url
     * @returns {string}
     */
    getPhotoUrl() {
        return this.photoUrl;
    }

    /**
     * returns the type
     *
     * @returns {string}
     */
    getType() {
        return this.type;
    }

};

QuestionPostSubject = class QuestionPostSubject {


};

QuestionVideoPostSubject = class QuestionVideoPostSubject {

};

QuestionLinkPostSubject = class QuestionLinkPostSubject {

};

QuestionCommentSubject = class QuestionCommentSubject {

};

QuestionSubject = class QuestionSubject {

};
