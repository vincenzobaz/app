Meteor.methods({
    'sayHello': function(text){
        console.log("hello " + text);a
    },
    'fetchGameBoard': function(userId){
        var gameCreator = process.env.GAMECREATOR_URL;
        var url = gameCreator+ "/gameboard?user_id=" + userId;
        var get = Meteor.wrapAsync(Meteor.http.get);
        var result = get(url);
        console.log("Gameboards" + result.data);
        return {status: "success", gameBoard: result.data}

    },
    'fetchData': function(){
        var accesstoken = "CAACEdEose0cBAM810upRgDgZAkh5fUm9iNknOhbWfGfJrsYAFowKR6oPTomH87s7kYn7pnVcNOu2iVudoaVXhO3wVDfjEGetjeA1TKVsQkxOGhLtWY6oi9QwnAo11DddNkABttO4NeDFLknlTxKZC7HaXDPeRHg1ZBGeAeiRWLcJ80WbLRkY0Y2RRRq82ISR3rqEl8r7MEEsG7VmEMBgwJoou6YV94ZD";
        var userId = "10153179507419968";
        var gameCreator = process.env.GAMECREATOR_URL;

        var url = gameCreator + "/fetchData?user_id=" + userId + "&access_token=" + accesstoken;
        console.log(url);
        Meteor.http.get(url, function (err, res) {
            console.log(res.statusCode, res.data);
        });
    },

    'JoinRequest.decline': function(requestId) {
        JoinRequests.remove(requestId);
        return {status: "success", error: null};
    },

    'JoinRequest.accept': function(requestId) {
        var request = JoinRequests.findOne(requestId);
        var game = Games.findOne(request.gameId);
        var currentUser = Meteor.userId();
        if (currentUser !== request.to){
            throw Meteor.Error("404", "Request does not exist");
        }
        var board1 = Server.fetchGameBoard(request.from);
        var board2 = Server.fetchGameBoard(request.to);
        var saveBoard1 = Meteor.wrapAsync(board1.save);
        var saveBoard2 = Meteor.wrapAsync(board2.save);
        var board1Id = saveBoard1();
        var board2Id = saveBoard2();

        game.player1Board = board1Id;
        game.player2Board = board2Id;
        var gameSave = Meteor.wrapAsync(game.save, game);
        gameSave();

        return({gameBoards: [board1Id, board2Id]});

    },

    'JoinRequest.send': function(userId) {
        var future = new Future();
        var game = new Game(null, Meteor.userId(), userId, undefined, undefined, "waiting", _.random(1,2), undefined, undefined);
        game.save(function(error, gameId){
            if (!error){
                var join = new JoinRequest(null, Meteor.userId(), userId, gameId);
                join.save(function(error, requestId){
                    if (!error){
                        future.return({status: "success", requestId: requestId});
                    } else {
                        future.return({status: "error", error: error});
                    }
                })
            } else {
                future.return({status: "error", error: error});
            }
        });
        return future.wait();

    },

    'Game.start': function(userId) {
        var gameId = "example";
        return {status: "success"};
    },
    'Game.quit': function(gameId) {
        return {status: "success"};
    },
    'Game.timeout': function(gameId){
        return {status: "success"};
    },
    /**
     *
     * @param {string} gameId ObjectId - Id of the game
     * @param {string} tileId ObjectId - Id of tile
     * @param {Object[]} answers Array of answers - the answer selected
     * @returns {{status: string, data: {correct: number, wrong: number}}}
     */
    'Answer.post': function(gameId, tileId, answers){
        var game = Games.find(gameId);
        var board;
        var currentUser = Meteor.userId();
        if (currentUser === game.player1) {
            board = GameBoards.find(game.player1Board);
        } else if (currentUser === game.player2) {
            board = GameBoards.find(game.player2Board);
        } else {
            throw Meteor.Error(404, "Invalid gameId + " + gameId + "user does not play this game");
        }
        var tile = _.find(board.tiles, function(tile){return tile.id === tileId});
        if (tile){
            var correctAnswer = _.map(tile.questions, function(q){return q.answer});
            var result = _.reduce(_.map(_.zip(correctAnswer, answers), function(aa){
                return aa[0] === aa[1] ? 1 : 0;
            }), function(acc, r){return acc + r;}, 0);
            return {
                status: "success",
                data: {
                    correct: result,
                    wrong: 3 - result
                }
            }
        } else {
            throw Meteor.Error(404, "Invalid tileId + " + tileId);
        }

    }



});
