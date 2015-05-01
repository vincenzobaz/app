
JoinRequestService = {

    accept(requestId) {
        var currentUser = this.userId ? this.userId: Bots[1]._id;
        var request = JoinRequests.findOne(requestId);


        if (currentUser !== request.to && request.to !== Bots[0]._id && request.to !== Bots[1]._id){
            throw Meteor.Error("404", "Request does not exist with id" + requestId);
        }
        console.log('the reqeust' + request.gameId);
        var game = Games.findOne(request.gameId);

        var board1 = Server.fetchGameBoard(request.from);
        var board2 = Server.fetchGameBoard(request.to);

        var board1Id = GameBoardRepository.save(board1);
        var board2Id = GameBoardRepository.save(board2);

        console.log("Gameboard 1: " +board1Id);
        game.player1Board = board1Id;
        game.player2Board = board2Id;
        GameRepository.save(game);

        JoinRequests.remove(requestId);

        return game;
    },

    decline(requestId) {
        JoinRequests.remove(requestId);
    },

    send(userId) {
        // TODO: Move that logic to GameService
        var currentUser = this.userId ? Meteor.userId: Bots[0]._id;
        var game = new Game(null, currentUser, userId, undefined, undefined, "waiting", _.random(1,2), {}, {});
        try {
            var gameId = GameRepository.save(game);
            var join = new JoinRequest(null, currentUser, userId, gameId);
            var requestId = JoinRequestRepository.save(join);
            return {status: "success", requestId: requestId};
        }
        catch (error) {
            return {status: "error", error: error};
        }
    }

};

