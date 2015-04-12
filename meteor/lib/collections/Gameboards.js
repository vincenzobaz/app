GameBoards = new Mongo.Collection("gameBoards", {
    transform: function(doc) {
        return new GameBoard(doc._id, doc.userId, doc.tiles)
    }
});

// data model

Content = function(question, text, imageUrl) {
    this._question = question;
    this._text = text;
    this._imageUrl = imageUrl;
};

Content.FromRaw = function(data) {
  return new Content(data.question, data.text, data.image_url);
};

Content.prototype = {
    get question(){
        return this._question;
    },
    get text(){
        return this._text;
    },
    get imageUrl() {
        return this._imageUrl;
    }
};

Choice = function(text, imageUrl, fbId) {
    this._text = text;
    this._imageUrl = imageUrl;
    this._fbId = fbId;
};

Choice.FromRaw = function(data) {
  return new Choice(data.text, data.image_url, data.fb_id);
};

Choice.prototype = {
    get text(){
        return this._text;
    },
    get imageUrl() {
        return this._imageUrl;
    },
    get fbId() {
        return this._fbId;
    }
};

McQuestion = function(id, content, choices, answer) {
    this._id = id;
    this._content = content;
    this._choices = choices;
    this._answer = answer;
};

McQuestion.FromRaw = function(data){
    var choices = _.map(data.choices, function(c){
        return new Choice.FromRaw(c);
    });
    return new McQuestion(generateId(), Content.FromRaw(data.question), choices, data.answer);
};

McQuestion.prototype = {
    get id() {
        return this._id;
    },
    get content() {
        return this._content;
    },
    get choices() {
        return this._choices;
    },
    get answer() {
        return this._answer;
    }
};

TlQuestion = function(id, content, minDate, maxDate, range, answer) {
    this._id = id;
    this._content = content;
    this._minDate = minDate;
    this._maxDate= maxDate;
    this._range = range;
    this._answer = answer;
};

TlQuestion.FromRaw = function(data){
    return new TlQuestion(
        generateId(),
        data.min_date,
        data.max_date,
        data.range,
        data.answer
    );
};

TlQuestion.prototype = {
    get id() {
        return this._id;
    },
    get minDate() {
        return this._minDate;
    },
    get maxDate() {
        return this._maxDate;
    },
    get range() {
        return this._range;
    },
    get answer() {
        return this._answer;
    }
};

Tile = function(id, type, question1, question2, question3){
    this._id = id;
    this._type = type;
    this._questions = [question1, question2, question3];
};

Tile.prototype = {
    get id() {
        return this._id;
    },
    get type() {
        return this._type;
    },
    get question1() {
        return this._questions[0];
    },
    get question2() {
        return this._questions[1];
    },
    get question3() {
        return this._questions[2];
    },
    get questions(){
        return this._questions;
    }
};



/**
 *
 * @param id
 * @param userId
 * @param tiles
 * @constructor
 */

GameBoard = function(id, userId, tiles){
    this._id = id;
    this._userId = userId;
    this._tiles = tiles;
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
        } else {
            throw new Meteor.Error("404", "Unknown Question type " + t.type)
        }
        return new Tile(generateId(), t.type, question1, question2, question3)

    });
    return new GameBoard(generateId(), userId, tiles);
};

GameBoard.prototype = {
    get id() {
        return this._id;
    },
    get userId() {
        return this._userId;
    },
    get tiles() {
        return this._tiles;
    },

    save: function(callback) {
        {
            var doc = _.pick(this, 'content', 'choices', 'answer');
            if (Meteor.isServer) {

                if (this.id) {
                    GameBoards.update(this.id, {$set: doc}, callback);
                } else {
                    // remember the context, since in callback it's changed
                    var that = this;
                    GameBoards.insert(doc, function (error, result) {
                        that._id = result;

                        if (callback != null) {
                            callback.call(that, error, result);
                        }
                    });
                }

            } else {
                throw new Meteor.Error(403, "Access Denied");
            }

        }
    }
};