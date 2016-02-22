import {assignProps} from './../helpers/assignProps';

export const Gamestats = new Mongo.Collection('gamestats', {
    transform: function(doc){
        return new Gamestat(doc);
    }
});

export const GamestatProps = ['_id', 'userId', 'gamesPlayed', 'gamesWon', 'gamesLost',
    'MCWhoLikedYourPostQuestionsTried', 'MCWhoLikedYourPostCorrect',
    'MCWhoMadeThisCommentOnYourPostQuestionsTried', 'MCWhoMadeThisCommentOnYourPostCorrect',
    'MCWhichPageDidYouLikeQuestionsTried', 'MCWhichPageDidYouLikeCorrect',
    'TLWhenDidYouShareThisPostQuestionsTried', 'TLWhenDidYouShareThisPostCorrect',
    'GeoWhatCoordinatesWereYouAtQuestionsTried', 'GeoWhatCoordinatesWereYouAtCorrect',
    'MCTried', 'MCCorrect',
    'TLTried', 'TLCorrect',
    'GeoTried', 'GeoCorrect',
    'OrderTried', 'OrderCorrect'
];






export class Gamestat {

    constructor(props) {
        const diff = _.difference(Object.keys(props), GamestatProps);
        if (!_.isEmpty(diff)){
            throw new Meteor.Error(500, "Game constructor with unusable parameters " + diff);
        }

        _.forEach(GamestatProps, p => {
            if (!props[p] && p !== '_id') {
                props[p] = 0;
            }
        });
        assignProps(this, GamestatProps, props);
    }

    getGamesPlayed(){
        return this.gamesPlayed;
    }
    setGamesPlayed(value) {
        this.gamesPlayed = value;
    }

    getGamesWon() {
        return this.gamesWon;
    }

    setGamesWon(value) {
        this.gamesWon = value;
    }

    getGamesLost() {
        return this.gamesLost;
    }

    setGamesLost(value) {
        this.gamesLost = value;
    }

    getGamesDrawn() {
      return this.getGamesPlayed() - this.getGamesWon() - this.getGamesLost();
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

    getTLWhenDidYouLikeThisPageQuestionsTried() {
        return this.TLWhenDidYouLikeThisPageQuestionsTried;
    }
    
    setTLWhenDidYouLikeThisPageQuestionsTried(value) {
        this.TLWhenDidYouLikeThisPageQuestionsTried = value;
    }

    getTLWhenDidYouShareThisPostCorrect() {
        return this.TLWhenDidYouShareThisPostCorrect;
    }

    setTLWhenDidYouShareThisPostCorrect(value) {
        this.TLWhenDidYouShareThisPostCorrect = value;
    }
    
    getTLWhenDidYouLikeThisPageCorrect() {
        return this.TLWhenDidYouLikeThisPageCorrect;
    }
    
    setTLWhenDidYouLikeThisPageCorrect(value) {
        this.TLWhenDidYouLikeThisPageCorrect = value;
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

    getOrderTried() {
        return this.OrderTried;
    }

    setOrderTried(value) {
        this.OrderTried = value;
    }

    getOrderCorrect() {
        return this.OrderCorrect;
    }

    setOrderCorrect(value) {
        this.OrderCorrect = value;
    }
}

