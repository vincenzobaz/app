
Games = new Mongo.Collection("games", {
    transform: function(doc){
        return new Game(doc);
    }
});

const GameProps = ['_id', 'player1', 'player2', 'player1Board', 'player2Board',
                   'status', 'playerTurn', 'player1Scores', 'player2Scores', 'boardState'];

Game = class Game {

    constructor(props) {
        assignProps(this, GameProps, props);
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

    getBoardState() {
        return this.boardState;
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

    nextTurn() {
        this.setPlayerTurn(this.getPlayerTurn() === 1 ? 2 : 1);
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

}

Game.fromRaw = (game) => {
    return new Game(game);
};

