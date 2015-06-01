
Stats = new Mongo.Collection("stats", {
    transform: function(doc){
        return new Stat(doc);
    }
});

StatProps = ['_id', 'userId', 'gamesPlayed', 'gamesWon', 'gamesLost',
    'MCWhoLikedYourPostQuestionsTried', 'MCWhoLikedYourPostCorrect',
    'MCWhoMadeThisCommentOnYourPostQuestionsTried', 'MCWhoMadeThisCommentOnYourPostCorrect',
    'MCWhichPageDidYouLikeQuestionsTried', 'MCWhichPageDidYouLikeCorrect',
    'TLWhenDidYouShareThisPostQuestionsTried', 'TLWhenDidYouShareThisPostCorrect',
    'GeoWhatCoordinatesWereYouAtQuestionsTried', 'GeoWhatCoordinatesWereYouAtCorrect',
    'MCTried', 'MCCorrect',
    'TLTried', 'TLCorrect',
    'GeoTried', 'GeoCorrect'
];


Stat = class Stat {

    constructor(props) {
        const diff = _.difference(Object.keys(props), StatProps);
        if (!_.isEmpty(diff)){
            throw new Meteor.Error(500, "Game constructor with unusable parameters " + diff);
        }
        assignProps(this, GameProps, props);
    }

    getMCWhoLikedYourPostQuestionsTried() {
        return this.MCWhoLikedYourPostQuestionsTried;
    }

    setMCWhoLikedYourPostQuestionsTried(value) {
        this.MCWhoLikedYourPostQuestionsTried = value;
    }

    getMCWhoLikedYourPostCorrect() {
        return this.MCWhoLikedYourPostCorrect;
    }

    setMCWhoLikedYourPostCorrect(value){
        this.MCWhoLikedYourPostCorrect = value;
    }

    getMCWhoMadeThisCommentOnYourPostQuestionsTried() {
        return this.MCWhoMadeThisCommentOnYourPostQuestionsTried;
    }

    setMCWhoMadeThisCommentOnYourPostQuestionsTried(value) {
        this.MCWhoMadeThisCommentOnYourPostQuestionsTried = value;
    }

    getMCWhoMadeThisCommentOnYourPostCorrect() {
        return this.MCWhoMadeThisCommentOnYourPostCorrect;
    }

    setMCWhoMadeThisCommentOnYourPostCorrect(value) {
        this.MCWhoMadeThisCommentOnYourPostCorrect = value;
    }

    getMCWhichPageDidYouLikeQuestionsTried() {
        return this.MCWhichPageDidYouLikeQuestionsTried;
    }

    setMCWhichPageDidYouLikeQuestionsTried(value) {
        this.MCWhichPageDidYouLikeQuestionsTried = value;
    }

    getMCWhichPageDidYouLikeCorrect() {
        return this.MCWhichPageDidYouLikeCorrect;
    }

    setMCWhichPageDidYouLikeCorrect(value) {
        this.MCWhichPageDidYouLikeCorrect = value;
    }

    getTLWhenDidYouShareThisPostQuestionsTried() {
        return this.TLWhenDidYouShareThisPostQuestionsTried;
    }

    setTLWhenDidYouShareThisPostQuestionsTried(value) {
        this.TLWhenDidYouShareThisPostQuestionsTried = value;
    }

    getTLWhenDidYouShareThisPostCorrect() {
        return this.TLWhenDidYouShareThisPostCorrect;
    }

    setTLWhenDidYouShareThisPostCorrect(value) {
        this.TLWhenDidYouShareThisPostCorrect = value;
    }

    getGeoWhatCoordinatesWereYouAtQuestionsTried() {
        return this.GeoWhatCoordinatesWereYouAtQuestionsTried;
    }

    setGeoWhatCoordinatesWereYouAtQuestionsTried(value) {
        this.GeoWhatCoordinatesWereYouAtQuestionsTried = value;
    }

    getGeoWhatCoordinatesWereYouAtCorrect() {
        return this.GeoWhatCoordinatesWereYouAtCorrect;
    }

    setGeoWhatCoordinatesWereYouAtCorrect(value) {
        this.GeoWhatCoordinatesWereYouAtCorrect = value;
    }

    getMCTried() {
        return this.MCTried;
    }

    setMCTried(value) {
        this.MCTried = value;
    }

    getMCCorrect() {
        return this.MCCorrect;
    }

    setMCCorrect(value) {
        this.MCCorrect = value;
    }

    getTLTried() {
        return this.TLTried;
    }

    setTLTried(value) {
        this.TLTried = value;
    }

    getTLCorrect() {
        return this.TLCorrect;
    }

    setTLCorrect(value) {
        this.TLCorrect = value;
    }

    getGeoTried() {
        return this.GeoTried;
    }

    setGeoTried(value) {
        this.GeoTried = value;
    }

    getGeoCorrect() {
        return this.GeoCorrect;
    }

    setGeoCorrect(value) {
        this.GeoCorrect = value;
    }
};
