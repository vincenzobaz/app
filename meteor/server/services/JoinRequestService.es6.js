
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
            console.error("we didn't fetched board 1" + e);
            const fetch1 = new GameFetch({gameId: game.getId(), player: 1, playerId:game.getPlayer1(), tries: 1});
            GameFetchRepository.save(fetch1);
        }

        try {
            var board2 = Server.fetchGameBoard(request.to);
            var board2Id = GameBoardRepository.save(board2);
            game.player2Board = board2Id;
        }
        catch (e) {
            console.error("we didn't fetched board 2 " + e);
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
        const friend = Friends.findOne(friendId);
        const bots = BotService.bots();
        var opponent;
        if (friendId === bots[0]._id || friendId === bots[1]._id){
            opponent = Meteor.users.findOne(friendId);

        } else {

            if (friend == null) {
                const msg = `Couldn't find a friend with id ${friendId}.`;
                console.error(msg);
                return {
                    status: 'error',
                    msg: msg
                };
            }

            console.log('checking if user ' + currentUserId + ' is friend with ', friend);
            opponent = Meteor.users.findOne({"services.facebook.id": friend.facebookId});

            console.log("we found opponent ", opponent);
            // if (friend.friendOf !== currentUserId) {
            //     const msg = `Friend with id ${friendId} is not a friend of the logged-in user.`;
            //     console.error(msg);
            //     return {
            //         status: 'error',
            //         msg: msg
            //     };
            // }

            if (!friend.isBot && friend.facebookId == null) {
                const msg = `Friend with id ${friendId} has no associated Facebook id.`;
                console.error(msg);
                return {
                    status: 'error',
                    msg: msg
                };
            }

            if (!friend.isBot && friend.userId == null) {
                const friendUser = UserRepository.byFacebookId(friend.facebookId);

                if (friendUser == null) {
                    const msg = `Friend ${friendId} has no associated user.`;
                    console.error(msg);
                    return {
                        status: 'error',
                        msg: msg
                    };
                }

                friend.userId = friendUser._id;
                FriendRepository.save(friend);
            }
        }

        const game      = GameService.createGame(currentUserId, opponent._id);
        const gameId    = GameRepository.save(game);

        console.log(`c: ${currentUserId}, f: ${friendId}`);
        const join      = JoinRequest.fromRaw({ from: currentUserId, to: opponent._id, gameId: gameId });
        const requestId = JoinRequestRepository.save(join);

        //console.log(`Created join request ${requestId} from ${currentUserId} to ${friend.userId} for game ${gameId}`);

        console.log(`Created join request ${requestId} from ${currentUserId} to ${ opponent._id} for game ${gameId}`);

        return { status: "success", requestId: requestId };
    }

};

