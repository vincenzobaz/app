Meteor.methods({

    'fetchGameBoard': function(userId) {
        var data = Server.fetchGameBoard(userId);
        return {status: "success", gameBoard: data};
    },

    'fetchData': function(userId) {
      Server.fetchData(userId);
    },

    'Account.deleteAllData': function() {
        console.error(`Deleting Data for user: ${Meteor.userId()}`);
        const user = Meteor.users.findOne(Meteor.userId());
        const fbUserId = user.services.facebook.id;
        const url = `${process.env.GAME_CREATOR_URL}/removeUser?user_id=${fbUserId}`;
        const del = Meteor.wrapAsync(Meteor.http.del);
        const result = del(url);

        if (result.statusCode === 200) {
            Meteor.users.remove(Meteor.userId());
        }
        console.error(`We deleted with following result:`, result.data.message);
        return {
            status: 'success',
            msg: result.data.message
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

    'Answer.timeOut': function(gameId, tileId) {
        console.error('Method Answer.timeOut is not implemented yet.');
        const /**Game*/ game = Games.findOne(gameId);
        const board = game.getCurrentBoard();
        const tile = board.getTileById(tileId);
        const index = _.findIndex(board.getTiles(), t => t.getId() === tileId);
        const row = Math.floor(index / 3);
        const col = index % 3;
        game.removeCurrentPlayerAvailableMove({row: row, column: col});
        tile.setDisabled(true);
        GameBoardRepository.save(board);
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
                case Question.Kind.Geolocation:
                    return new GeoAnswer(new GeoData(new Marker(qa[1].data.marker.latitude, qa[1].data.marker.longitude)));
                break;
                case Question.Kind.Order:

                    return new OrderAnswer(qa[1].timespent, new OrderData(_.map(qa[1].data.items, i => {
                        return new OrderItem(i.id, i.text);
                    })));
                break;
                default:
                    console.error('Unsupported question type ' + qa[0].getKind());
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
