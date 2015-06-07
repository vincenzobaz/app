
Games = new Mongo.Collection("games", {
    transform: function(doc){
        return new Game(doc);
    }
});

GameProps = ['_id', 'player1', 'player2', 'player1Board', 'player2Board',
    'status', 'playerTurn', 'player1Scores', 'player2Scores', 'boardState',
    'player1AvailableMoves',
    'player2AvailableMoves'
];


Game = class Game {



    constructor(props) {
        const diff = _.difference(Object.keys(props), GameProps);
        if (!_.isEmpty(diff)){
            throw new Meteor.Error(500, "Game constructor with unusable parameters " + diff);
        }
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

    /**
     *
     * @returns {GameBoard}
     */
    getCurrentBoard() {
        console.log("current player " + this.getPlayerTurn());
        console.log("player" + this.getPlayerTurn() + "Board");
        return GameBoards.findOne(this["player" + this.getPlayerTurn() + "Board"])
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

    incrementCurrentPlayerScore(value) {
        this['player' + this.getPlayerTurn() + 'Scores'] += value;
    }

    getOpponent() {
        var myId = Meteor.userId();

        if (this.player1 === myId) {
            return this.player2;
        }
        return this.player1;
    }

    getOpponentForUser(userId) {
        if (this.player1 === userId) {
            return this.player2;
        }
        return this.player1;
    }

    getPlayer1AvailableMoves(){
        return this.player1AvailableMoves;
    }


    setPlayer1AvailableMoves(value) {
        this.player1AvailableMoves = value;
    }

    getPlayer2AvailableMoves(){
        return this.player2AvailableMoves;
    }

    setPlayer2AvailableMoves(value) {
        this.player2AvailableMoves = value;
    }

    getCurrentPlayerAvailableMoves() {
        return this['player' + this.getPlayerTurn() + 'AvailableMoves'];
    }

    setCurrentPlayerAvailableMoves(value) {
        this['player' + this.getPlayerTurn() + 'AvailableMoves'] = value;
    }

    removeCurrentPlayerAvailableMove(move) {
        this.setCurrentPlayerAvailableMoves(
        _.filter(this.getCurrentPlayerAvailableMoves(), m => {return m.row !== move.row || m.column !== move.column})
        );
    }

    createCopy() {
        var newBoardState = GameBoardClone(this.getBoardState());
        //for (var i = 0; i < this.getBoardState().length; i++){
        //    newBoardState.push([]);
        //    for (var j = 0; j < this.getBoardState()[i].length; j++){
        //        newBoardState[i][j] = this.getBoardState()[i][j].slice(0);
        //    }
        //}
        return new Game({
            _id: this.getId(),
            player1: this.getPlayer1(),
            player2: this.getPlayer2(),
            player1Board: this.getPlayer1Board(),
            player2Board: this.getPlayer2Board(),
            status: this.getStatus(),
            playerTurn: this.getPlayerTurn(),
            player1Scores: this.getPlayer1Scores(),
            player2Scores: this.getPlayer2Scores(),
            boardState: newBoardState,
            player1AvailableMoves: this.getPlayer1AvailableMoves(),
            player2AvailableMoves: this.getPlayer2AvailableMoves()
        });
    }



};

Game.fromRaw = (game) => {
    return new Game(game);
};

GameBoardClone = (existingArray) => {
    var newObj = (existingArray instanceof Array) ? [] : {};
    for (i in existingArray) {
        if (i == 'clone') continue;
        if (existingArray[i] && typeof existingArray[i] == "object") {
            newObj[i] = GameBoardClone(existingArray[i]);
        } else {
            newObj[i] = existingArray[i]
        }
    }
    return newObj;
};
