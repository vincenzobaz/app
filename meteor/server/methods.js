Meteor.methods({
    'sayHello': function(text){
        console.log("hello " + text);a
    },
    'fetchGameBoard': function(userId) {
        var data = Server.fetchGameBoard(userId);
        return {status: "success", gameBoard: data};
    },
    'fetchData': function(userId) {
      Server.fetchData(userId);
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
        game.status = 'playing';
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
