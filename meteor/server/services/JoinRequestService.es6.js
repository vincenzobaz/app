
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

        game.setStatus(GameStatus.Playing);

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

        var game = Game.fromRaw({
            player1: currentUser,
            player2: userId,
            status: GameStatus.Waiting,
            playerTurn: _.random(1,2),
            player1Scores: {},
            player2Scores: {},
            boardState: boardState
        });

        try {
            var gameId = GameRepository.save(game);
            var join = JoinRequest.fromRaw({ from: currentUser, to: userId, gameId: gameId });
            var requestId = JoinRequestRepository.save(join);
            return {status: "success", requestId: requestId};
        }
        catch (error) {
            return {status: "error", error: error};
        }
    }

};

