
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
        const request = JoinRequests.findOne(requestId);

        if (request == null) {
          const msg = `No request with id ${requestId} found.`;
          console.error(msg);
          return {
            status: 'error',
            msg: msg
          };
        }

        JoinRequests.remove(requestId);
        var game = Games.findOne(request.gameId);
        game.setStatus(GameStatus.Declined);
        GameRepository.save(game);
        return {status: "success"};
    },

    getOpponent(currentUserId, friendId) {
        const friend = Friends.findOne(friendId);

        if (friend == null) {
            const msg = `Couldn't find a friend with id ${friendId}.`;
            throw new Meteor.Error('JoinRequestService.noFriendWithId', msg);
        }

        if (friend.isBot) {
            console.log(`Opponent is a bot.`);
            return BotService.getBot();
        }

        if (friend.facebookId == null) {
          const msg = `Friend with id ${friendId} has no associated Facebook id.`;
          throw new Meteor.Error('JoinRequestService.noAssociatedFacebook', msg);
        }

        console.log(`Checking if user ${currentUserId} is friend with ${friend.userId}`);

        if (friend.userId == null) {
          const friendUser = UserRepository.byFacebookId(friend.facebookId);

          if (friendUser == null) {
            const msg = `Friend ${friendId} has no associated user.`;
            throw new Meteor.Error('JoinRequestService.noAssociatedUser', msg);
          }

          friend.userId = friendUser._id;
          FriendRepository.save(friend);
        }

        const currentUser = Meteor.users.findOne(currentUserId);
        const asFriend    = {
          id: currentUser.services.facebook.id,
          name: currentUser.services.facebook.name,
          isBot: false
        };

        FriendRepository.updateFriends(friend.userId, [asFriend]);

        return Meteor.users.findOne(friend.userId);
    },

    send(currentUserId, friendId) {
      try {
        const opponent  = JoinRequestService.getOpponent(currentUserId, friendId);
        const game      = GameService.createGame(currentUserId, opponent._id);
        const gameId    = GameRepository.save(game);
        const join      = JoinRequest.fromRaw({ from: currentUserId, to: opponent._id, gameId: gameId });
        const requestId = JoinRequestRepository.save(join);

        console.log(`Created join request ${requestId} from ${currentUserId} to ${opponent._id} for game ${gameId}`);

        return {
          status: 'success',
          requestId: requestId
        };
      }
      catch (e) {
        console.error(`JoinRequestService - Error: ${e}`);
        return {
          status: 'error',
          msg: e.reason
        };
      }
    }

};

