
JoinRequestService = {

    accept(requestId) {
        var request = JoinRequests.findOne(requestId);

        if (!request){
            throw Meteor.Error("404", "Request does not exist with id" + requestId);
        }

        var game = Games.findOne(request.gameId);

        try {
            var board1 = Server.fetchGameBoard(request.from);
            var board1Id = GameBoardRepository.save(board1);
            game.player1Board = board1Id;
        } catch (e) {
            const fetch1 = new GameFetch({gameId: game.getId(), player: 1, playerId:game.getPlayer1(), tries: 1});
            GameFetchRepository.save(fetch1);
        }

        try {
            var board2 = Server.fetchGameBoard(request.to);
            var board2Id = GameBoardRepository.save(board2);
            game.player2Board = board2Id;
        }
        catch (e) {
            const fetch2 = new GameFetch({gameId: game.getId(), player: 2, playerId:game.getPlayer2(), tries: 1});
            GameFetchRepository.save(fetch2);
        }

        const status = (game.player1Board && game.player2Board) ? GameStatus.Playing : GameStatus.Creating;
        game.setStatus(status);

        GameRepository.save(game);
        JoinRequests.remove(requestId);

        return game;
    },

    decline(requestId) {
        JoinRequests.remove(requestId);
        var game = Games.findOne(request.gameId);
        game.setStatus(GameStatus.Declined);
        GameRepository.save(game);
        return {status: "success"};
    },

    send(currentUserId, friendId) {
        const opponent  = Friends.findOne(friendId);

        if (!opponent) {
            return { status: 'error', msg: 'Couldn\'t find a friend with id ' + friendId };
        }

        if (!opponent.userId) {
            return { status: 'error', msg: 'Friend with id ' + friendId + ' has no associated user id.' };
        }

        const game      = GameService.createGame(currentUserId, opponent.userId);
        const gameId    = GameRepository.save(game);
        const join      = JoinRequest.fromRaw({ from: currentUserId, to: opponent.userId, gameId: gameId });
        const requestId = JoinRequestRepository.save(join);

        return { status: "success", requestId: requestId };
    }

};

