
JoinRequestService = {

    accept(requestId) {
        var currentUser = Meteor.userId() ? Meteor.userId() : Bots[1]._id;
        var request = JoinRequests.findOne(requestId);

        if (currentUser !== request.to && request.to !== Bots[0]._id && request.to !== Bots[1]._id){
            throw Meteor.Error("404", "Request does not exist with id" + requestId);
        }

        var game = Games.findOne(request.gameId);

        var board1 = Server.fetchGameBoard(request.from);
        var board2 = Server.fetchGameBoard(request.to);

        var board1Id = GameBoardRepository.save(board1);
        var board2Id = GameBoardRepository.save(board2);

        game.player1Board = board1Id;
        game.player2Board = board2Id;

        game.setStatus("playing");

        GameRepository.save(game);

        JoinRequests.remove(requestId);

        return game;
    },

    decline(requestId) {
        JoinRequests.remove(requestId);
    },

    send(userId) {
        // TODO: Move that logic to GameService
        const currentUser = Meteor.userId() ? Meteor.userId() : Bots[0]._id;

        const boardState = [
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}],
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}],
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}]
        ];
        var game = new Game(null, currentUser, userId, undefined, undefined, "waiting", _.random(1,2), {}, {}, boardState);
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

