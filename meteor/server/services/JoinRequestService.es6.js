
JoinRequestService = {

  accept(requestId) {
    var request = JoinRequests.findOne(requestId);
    var game = Games.findOne(request.gameId);
    var currentUser = Meteor.userId();

    if (currentUser !== request.to){
        throw Meteor.Error("404", "Request does not exist");
    }

    var board1 = Server.fetchGameBoard(request.from);
    var board2 = Server.fetchGameBoard(request.to);

    var board1Id = GameBoardRepository.save(board1);
    var board2Id = GameBoardRepository.save(board2);

    game.player1Board = board1Id;
    game.player2Board = board2Id;
    game.status = 'playing';

    GameRepository.save(game);

    JoinRequests.remove(requestId);

    return {gameBoards: [board1Id, board2Id]};
  },

  decline(requestId) {
    JoinRequests.remove(requestId);
  },

  send(userId) {
    // TODO: Move that logic to GameService
    var game = new Game(null, Meteor.userId(), userId, undefined, undefined, "waiting", _.random(1,2), undefined, undefined);
    try {
      var gameId = GameRepository.save(game);
      var join = new JoinRequest(null, Meteor.userId(), userId, gameId);
      var requestId = JoinRequestRepository.save(join);
      return {status: "success", requestId: requestId};
    }
    catch (error) {
      return {status: "error", error: error};
    }
  }

};

