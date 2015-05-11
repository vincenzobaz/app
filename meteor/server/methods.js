Meteor.methods({

    'fetchGameBoard': function(userId) {
        var data = Server.fetchGameBoard(userId);
        return {status: "success", gameBoard: data};
    },

    'fetchData': function(userId) {
      Server.fetchData(userId);
    },

    'JoinRequest.decline': function(requestId) {
      JoinRequestService.decline(requestId);
      return {status: "success", error: null};
    },

    'JoinRequest.accept': function(requestId) {
      return JoinRequestService.accept(requestId);
    },

    'JoinRequest.send': function(to) {
      return JoinRequestService.send(this.userId, to);
    },

    'Game.start': function(gameId) {
        return GameService.start(gameId);
    },

    'Game.quit': function(gameId) {
        console.error('Method Game.quit is not implemented yet.');
        return {status: "success"};
    },

    'Answer.timeOut': function(gameId) {
        console.error('Method Answer.timeOut is not implemented yet.');
        return {status: "success"};
    },

    'Answer.post': function(gameId, tileId, answers) {
      return AnswerService.post(this.userId, gameId, tileId, answers);
    }

});
