
Games = new Mongo.Collection("games", {
    transform: function(doc){
        return new Game(doc._id, doc.player1, doc.player2,
            doc.player1Board, doc.player2Board, doc.status,
            doc.playerTurn, doc.player1Scores, doc.player2Scores)
    }
});


// data model
/**
 *
 * @param id
 * @param player1
 * @param player2
 * @param player1Board
 * @param player2Board
 * @param status
 * @param playerTurn
 * @param player1Scores
 * @param player2Scores
 * @constructor
 */
Game = function (id, player1, player2, player1Board, player2Board, status, playerTurn, player1Scores, player2Scores){
    this._id = id;
    this._player1 = player1;
    this._player2 = player2;
    this._player1Board = player1Board;
    this._player2Board = player2Board;
    this._status = status;
    this._playerTurn = playerTurn;
    this._player1Scores = player1Scores;
    this._player2Scores = player2Scores;
};

Game.prototype = {
    get id() {
        return this._id;
    },
    get player1() {
        return this._player1;
    },
    get player2() {
        return this._player2;
    },
    get player1Board() {
        return this._player1Board;
    },
    set player1Board(value) {
        this._player1Board = value;
    },
    get player2Board() {
        return this._player2Board;
    },
    set player2Board(value) {
        this._player2Board = value;
    },
    get status(){
        return this._status;
    },
    set status(value){
        this._status = value;
    },
    get playerTurn(){
        return this._playerTurn;
    },
    set playerTurn(value){
        if(value < 1 || value > 2){
            throw new Meteor.Error("There can only be 2 players per game, turn value " + value);
        }
        this._playerTurn = value;
    },
    get currentPlayer() {
      if (this.playerTurn === 1) {
        return this.player1;
      }
      return this.player2;
    },
    get player1Scores(){
        return this._player1Scores;
    },
    get player2Scores() {
        return this._player2Scores;
    },
    get opponent() {
      var myId = Meteor.userId();

      if (this.player1 === myId) {
        return this.player2;
      }
      return this.player1;
    },

    save: function(callback) {
        var doc = _.pick(this, 'player1', 'player2',
            'player1Board', 'player2Board', 'status',
            'playerTurn', 'player1Scores', 'player2Scores');

        if (Meteor.isServer) {
            console.log("saving game");
            console.log("saving board " + this._player2Board);
            if (this.id) {
                Games.update(this.id, {$set: doc}, callback);
            } else {
                // remember the context, since in callback it's changed
                var that = this;
                Games.insert(doc, function(error, result) {
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
};

