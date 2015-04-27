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

    'JoinRequest.send': function(userId) {
      return JoinRequestService.send(userId);
    },

    'Game.start': function(gameId) {
        console.log("starting game " + gameId);

        var game = Games.findOne(gameId);
        console.log(game);
        game.status = "Playing";
        var gameSave = Meteor.wrapAsync(game.save, game);
        gameSave();
        return {status: "success"};
    },

    'Game.quit': function(gameId) {
        return {status: "success"};
    },

    'Game.timeout': function(gameId){
        return {status: "success"};
    },

    'Answer.post': function(gameId, tileId, answers) {
      AnswerService.post(gameId, tileId, answers);
    }

});
