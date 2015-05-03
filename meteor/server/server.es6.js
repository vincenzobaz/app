
Server = function(){};

Server.fetchGameBoard = function(userId) {
    if (userId === Bots[0]._id || userId === Bots[1]._id){
        return GameBoard.FromRaw(userId, JSON.parse(Assets.getText("json/gameboards/gameboard1.json")));
    }
    console.log('What the fuck ' + userId);
    const user = Meteor.users.findOne(userId);
    const fbUserId = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;
    const params = {
        user_id: fbUserId,
        access_token: accessToken
    };

    const url = `${Meteor.settings.gameCreateorUrl}/gameboard?${Querystring.encode(params)}`;
    const get = Meteor.wrapAsync(Meteor.http.get);
    const result = get(url);
    return GameBoard.FromRaw(userId, result.data);
};


Server.fetchData = function(userId) {
    const user = Meteor.users.findOne(userId);
    const fbUserId = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;
    const params = {
        user_id: fbUserId,
        access_token: accessToken
    };

    const url = `${Meteor.settings.gameCreateorUrl}/fetchData?${Querystring.encode(params)}`;
    Meteor.http.get(url, function (err, res) {
        console.error(res.statusCode, res.data);
    });
};

Server.createBotGame = function(strategy){
    var bot1 = Bots[0];
    var bot2 = Bots[1];
    var result = JoinRequestService.send(bot2._id);
    var game = JoinRequestService.accept(result.requestId);
    var query = Games.find(game._id);
    var handle1 = query.observe({
        changed: function(newGame, oldGame) {
            if (newGame.playerTurn === 1){
                setTimeout(Meteor.bindEnvironment(function(){
                    if (newGame.status !== "finished"){
                        const result = Server.playTurn(newGame);
                        if (result.win || result.draw){
                            handle1.stop();
                            handle2.stop();
                            newGame.status = "finished";
                            GameRepository.save(newGame);
                            console.log(`Game Finished: Player1 won:${result.win}, Draw: ${result.draw}`);
                        }
                    }

                }), 100);
            }

        },
        added: function(id, fields) {
            console.log("it added");
        },
        removed: function(id) {
            console.log("it removed");
        }
    });
    var handle2 = query.observe({
        changed: function(newGame, oldGame) {
            if (newGame.playerTurn === 2){
                setTimeout(Meteor.bindEnvironment(function(){
                    if (newGame.status !== "finished"){
                        const result = Server.playTurn(newGame);
                        if (result.win || result.draw){
                            handle1.stop();
                            handle2.stop();
                            newGame.status = "finished";
                            GameRepository.save(newGame);
                            console.log(`Game Finished: Player2 won:${result.win}, Draw: ${result.draw}`);
                        }
                    }
                }), 100);
            }

        },
        added: function(id, fields) {
            console.log("it added");
        },
        removed: function(id) {
            console.log("it removed");
        }
    });
    GameService.start(game._id);
};

Server.playTurn = function(game) {
    var boardId;
    var answers;
    if (game.getPlayerTurn() == 1) {
        console.log("Bot1 playing");
        boardId = "player1Board";
    } else {
        console.log("Bot2 playing");
        boardId = "player2Board";
    }
    const gameBoard = GameBoards.findOne(game[boardId]);
    const tiles = gameBoard.getTiles();
    //const tile = _.sample(tiles);
    const tile = this.pickTile(game, gameBoard);
    if (tile.type === "MultipleChoice") {
        console.log("we got a MC");
        const choices = _.map(tile.questions, function (q) {
            return q.choices
        });
        answers = _.map(choices, function (c) {
            return _.random(0, c.length - 1)
        });
        return AnswerService.post(game._id, tile._id, answers);

    } else {
        console.log("we got type " + tile.type);
        answers = _.map(tile.questions, function (q) {
            const days = _.random(-q.minDate, q.maxDate) * 24 * 60 * 60 * 1000;
            var answer = new Date(new Date(q.answer).getTime() + days);
            return answer;
        });
        console.log("bots answers");
        console.log(answers);
        return AnswerService.post(game._id, tile._id, answers);
    }

};

Server.pickTile = function(game, gameBoard){
    const tiles = gameBoard.getTiles();
    const boardState = game.boardState;
    const indexTiles = _.zip(_.range(9),_.flatten(boardState));
    const potentialTiles = _.filter(indexTiles, function(t){return t[1].player === 0});
    console.log(`potentialTiles:`);
    console.log(potentialTiles);
    if (potentialTiles.length > 0){
        return tiles[_.sample(potentialTiles)[0]];
    } else {
        console.log('no pitential tiles');
        return _.sample(tiles);
    }
};
