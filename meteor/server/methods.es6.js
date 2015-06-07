Meteor.methods({

    'fetchGameBoard': function(userId) {
        var data = Server.fetchGameBoard(userId);
        return {status: "success", gameBoard: data};
    },

    'fetchData': function(userId) {
      Server.fetchData(userId);
    },

    'Account.deleteAllData': function() {
        console.error('Account.deleteAllData is not implemented yet');

        return {
            status: 'error',
            msg: 'Account.deleteAllData is not implemented yet'
        };
    },

    'JoinRequest.decline': function(requestId) {
      JoinRequestService.decline(requestId);
      return {status: "success", error: null};
    },

    'JoinRequest.accept': function(requestId) {
      return JoinRequestService.accept(requestId);
    },

    'JoinRequest.send': function(friendId) {
      return JoinRequestService.send(this.userId, friendId);
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
        const /**Game*/ game = Games.findOne(gameId);
        const board = game.getCurrentBoard();
        const tile = board.getTileById(tileId);
        const typedAnswers = _.map(_.zip(tile.getQuestions(), answers), (qa) => {
            switch(qa[0].getKind()) {
                case Question.Kind.MultipleChoice:
                    return new MultipleChoiceAnswer(new MultipleChoiceData(qa[1].data.choice));
                break;
                case Question.Kind.Timeline:
                    return new TimelineAnswer(new TimelineData(qa[1].data.date));
                break;
                case Question.Kind.Geo:
                    return new GeoAnswer(new GeoData(new Marker(qa[1].data.marker.latitude, qa[1].data.marker.longitude)));
                break;
                case Question.Kind.Order:
                    return new OrderAnswer(qa[1].timespent, new OrderData(_.map(qa[1].data.items, i => {
                        return new OrderItem(i.id, i.title);
                    })));
                default:
                    Meteor.Error(500, 'Unsupported question type ' + qa[0].getKind());
            }
        });
      return AnswerService.post(this.userId, gameId, tileId, typedAnswers);
    },

    'PlayBotGame': function() {
        BotService.createBotGame('smartBots');
        return {status: "success"};
    }

});
