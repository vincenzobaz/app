
Games = new Mongo.Collection("games", {
    transform: function(doc){
        return new Game(doc._id, doc.player1, doc.player2,
            doc.player1Board, doc.player2Board, doc.status,
            doc.playerTurn, doc.player1Scores, doc.player2Scores, doc.boardState)
    }
});

Game = class Game {

    constructor(id, player1, player2, player1Board, player2Board, status, playerTurn, player1Scores, player2Scores, boardState) {
        this._id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.player1Board = player1Board;
        this.player2Board = player2Board;
        this.status = status;
        this.playerTurn = playerTurn;
        this.player1Scores = player1Scores;
        this.player2Scores = player2Scores;
        this.boardState = boardState;
    }

    getId() {
        return this._id;
    }

    getPlayer1() {
        return this.player1;
    }

    getPlayer2() {
        return this.player2;
    }

    getPlayer1Board() {
        return this.player1Board;
    }

    setPlayer1Board(value) {
        this.player1Board = value;
    }

    getPlayer2Board() {
        return this.player2Board;
    }

    setPlayer2Board(value) {
        this.player2Board = value;
    }

    getStatus(){
        return this.status;
    }

    setStatus(value){
        this.status = value;
    }

    getPlayerTurn(){
        return this.playerTurn;
    }

    setPlayerTurn(value){
        if(value < 1 || value > 2){
            throw new Meteor.Error("There can only be 2 players per game, turn value " + value);
        }
        this.playerTurn = value;
    }

    getCurrentPlayer() {
        if (this.playerTurn === 1) {
            return this.player1;
        }
        return this.player2;
    }

    getPlayer1Scores(){
        return this.player1Scores;
    }

    getPlayer2Scores() {
        return this.player2Scores;
    }

    getOpponent() {
        var myId = Meteor.userId();

        if (this.player1 === myId) {
            return this.player2;
        }
        return this.player1;
    }

    //save(callback) {
    //    var doc = _.pick(this, 'player1', 'player2',
    //        'player1Board', 'player2Board', 'status',
    //        'playerTurn', 'player1Scores', 'player2Scores');
    //
    //    if (Meteor.isServer) {
    //        console.log("saving game");
    //        console.log(this);
    //        if (this.id) {
    //            Games.update(this.id, {$set: doc}, callback);
    //        } else {
    //            // remember the context, since in callback it's changed
    //            var that = this;
    //            Games.insert(doc, function(error, result) {
    //                that._id = result;
    //
    //                if (callback != null) {
    //                    callback.call(that, error, result);
    //                }
    //            });
    //        }
    //
    //    } else {
    //        throw new Meteor.Error(403, "Access Denied");
    //    }
    //}

}

