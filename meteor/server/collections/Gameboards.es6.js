GameBoards = new Mongo.Collection("gameBoards", {
    transform: function(doc) {
        return new GameBoard(doc._id, doc.userId, doc.tiles)
    }
});

Content = class Content {

    constructor(question, text, imageUrl) {
        this.question = question;
        this.text = text;
        this.imageUrl = imageUrl;
    }

    getQuestion(){
        return this.question;
    }

    getText(){
        return this.text;
    }

    getImageUrl() {
        return this.imageUrl;
    }
};


Content.FromRaw = function(data) {
  return new Content(data.question, data.text, data.image_url);
};

Choice = class Choice {

    constructor(text, imageUrl, fbId) {
        this.text = text;
        this.imageUrl = imageUrl;
        this.fbId = fbId;
    }

    getText() {
        return this.text;
    }

    getImageUrl() {
        return this.imageUrl;
    }

    getFbId() {
        return this.fbId;
    }
};

Choice.FromRaw = function(data) {
  return new Choice(data.text, data.image_url, data.fb_id);
};

McQuestion = class McQuestion {

    constructor(id, content, choices, answer) {
        this._id = id;
        this.content = content;
        this.choices = choices;
        this.answer = answer;
    }

    getId() {
        return this._id;
    }

    getContent() {
        return this.content;
    }

    getChoices() {
        return this.choices;
    }

    getAnswer() {
        return this.answer;
    }
};

McQuestion.FromRaw = function(data){
    var choices = _.map(data.choices, function(c){
        return new Choice.FromRaw(c);
    });
    return new McQuestion(generateId(), Content.FromRaw(data.question), choices, data.answer);
};

TlQuestion = class TlQuestion {

      constructor(id, content, minDate, maxDate, range, answer) {
        this._id = id;
        this.content = content;
        this.minDate = minDate;
        this.maxDate= maxDate;
        this.range = range;
        this.answer = answer;
    }

    getId() {
        return this._id;
    }

    getMinDate() {
        return this.minDate;
    }

    getMaxDate() {
        return this.maxDate;
    }

    getRange() {
        return this.range;
    }

    getAnswer() {
        return this.answer;
    }
};

TlQuestion.FromRaw = function(data){
    return new TlQuestion(
        generateId(),
        data.question,
        data.min_date,
        data.max_date,
        data.range,
        data.answer
    );
};

GeoQuestion = class GeoQuestion {
    constructor(id, userId, data, answer) {
        this._id = id;
        this.userId = userId;
        this.data = data;
        this.answer = answer;
    }
}

GeoQuestion.FromRaw = function(raw) {
  return new GeoQuestion(raw.id, raw.user_id, raw.question, raw.answer);
}

Tile = class Tile {

    constructor(id, type, question1, question2, question3) {
        this._id = id;
        this.type = type;
        this.questions = [question1, question2, question3];
    }

    getId() {
        return this._id;
    }

    getType() {
        return this.type;
    }

    getQuestion1() {
        return this.questions[0];
    }

    getQuestion2() {
        return this.questions[1];
    }

    getQuestion3() {
        return this.questions[2];
    }

    getQuestions(){
        return this.questions;
    }
};


GameBoard = class GameBoard {

    constructor(id, userId, tiles) {
      if (id) {
        this._id = id;
      }
      this.userId = userId;
      this.tiles = tiles;
    }

    getId() {
        return this._id;
    }

    getUserId() {
        return this.userId;
    }

    getTiles() {
        return this.tiles;
    }

};

GameBoard.FromRaw = function(userId, data){
    var tiles = _.map(data.tiles, function(t) {
        var question1;
        var question2;
        var question3;
        if (t.type === "Timeline") {
            question1 = new TlQuestion.FromRaw(t.question1);
            question2 = new TlQuestion.FromRaw(t.question2);
            question3 = new TlQuestion.FromRaw(t.question3);
        } else if (t.type === "MultipleChoice") {
            question1 = new McQuestion.FromRaw(t.question1);
            question2 = new McQuestion.FromRaw(t.question2);
            question3 = new McQuestion.FromRaw(t.question3);
        } else if (t.type === "Geolocation") {
            question1 = new GeoQuestion.FromRaw(t.question1);
            question2 = new GeoQuestion.FromRaw(t.question2);
            question3 = new GeoQuestion.FromRaw(t.question3);
        } else {
            throw new Meteor.Error("404", "Unknown Question type " + t.type)
        }
        return new Tile(generateId(), t.type, question1, question2, question3)

    });
    return new GameBoard(null, userId, tiles);
};

