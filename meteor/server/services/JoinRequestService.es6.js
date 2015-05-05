
JoinRequestService = {

    accept(requestId) {
        var request = JoinRequests.findOne(requestId);

        if (!request){
            throw Meteor.Error("404", "Request does not exist with id" + requestId);
        }

        var game = Games.findOne(request.gameId);

        var board1 = Server.fetchGameBoard(request.from);
        var board2 = Server.fetchGameBoard(request.to);

        var board1Id = GameBoardRepository.save(board1);
        var board2Id = GameBoardRepository.save(board2);

        game.player1Board = board1Id;
        game.player2Board = board2Id;

        game.setStatus(GameStatus.Playing);

        GameRepository.save(game);

        JoinRequests.remove(requestId);

        return game;
    },

    decline(requestId) {
        JoinRequests.remove(requestId);
        return {status: "success"};
    },

    send(currentUser, opponentId) {
        var game = GameService.createGame(currentUser, opponentId);
        var gameId = GameRepository.save(game);
        var join = JoinRequest.fromRaw({ from: currentUser, to: opponentId, gameId: gameId });
        var requestId = JoinRequestRepository.save(join);

        return {status: "success", requestId: requestId};
    }

};

