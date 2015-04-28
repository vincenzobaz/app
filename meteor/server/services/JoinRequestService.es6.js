
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
    var saveBoard1 = Meteor.wrapAsync(board1.save);
    var saveBoard2 = Meteor.wrapAsync(board2.save);
    var board1Id = saveBoard1();
    var board2Id = saveBoard2();

    game.player1Board = board1Id;
    game.player2Board = board2Id;
    game.status = 'playing';
    var gameSave = Meteor.wrapAsync(game.save, game);
    gameSave();

    return {gameBoards: [board1Id, board2Id]};
  },

  decline(requestId) {
    JoinRequests.remove(requestId);
  },

  send(userId) {
    var game = new Game(null, Meteor.userId(), userId, undefined, undefined, "waiting", _.random(1,2), undefined, undefined);
    var gameSave = Meteor.wrapAsync(game.save, game);
    try {
      var gameId = gameSave();
      var join = new JoinRequest(null, Meteor.userId(), userId, gameId);
      var joinSave = Meteor.wrapAsync(join.save, join);
      var requestId = joinSave();
      return {status: "success", requestId: requestId};
    }
    catch (error) {
      return {status: "error", error: error};
    }
  }

};

