
Meteor.methods({

  fetchData(userId) {
    check(userId, String);

    Server.fetchData(userId);

    return {
      status: 'success'
    };
  },

  fetchGameBoard(userId) {
    check(userId, String);

    const data = Server.fetchGameBoard(userId);

    return {
      status: 'success',
      gameBoard: data
    };
  },

  'Account.deleteAllData'() {
    const userId   = Meteor.userId();

    console.log(`Deleting data for user: ${userId}`);

    const user     = Meteor.users.findOne(userId);
    const fbUserId = user.services.facebook.id;

    const result = AccountService.deleteUserData(fbUserId);

    if (result.statusCode === 200) {
      Meteor.users.remove(userId);
    }

    console.log('Data deleted with following result:', result.data.message);

    return {
      status: result.statusCode === 200 ? 'success' : 'error',
      msg: result.data.message
    };
  },

  'JoinRequest.decline'(requestId) {
    check(requestId, String);

    return JoinRequestService.decline(requestId);
  },

  'JoinRequest.accept'(requestId) {
    check(requestId, String);

    return JoinRequestService.accept(requestId);
  },

  'JoinRequest.send'(friendId) {
    check(friendId, String);

    return JoinRequestService.send(this.userId, friendId);
  },

  'Game.start'(gameId) {
    check(gameId, String);

    return GameService.start(gameId);
  },

  'Game.quit'(gameId) {
    check(gameId, String);

    console.error('Method Game.quit is not implemented yet.');
    return {
      status: 'success'
    };
  },

  'Answer.timeOut'(gameId, tileId) {
    check(gameId, String);
    check(tileId, String);

    return AnswerService.timeOut(this.userId, gameId, tileId);
  },

  'Answer.post'(gameId, tileId, answers) {
    check(gameId, String);
    check(tileId, String);

    return AnswerService.post(this.userId, gameId, tileId, answers);
  },

  'Build.info'() {
    try {
      const result = GameCreatorService.fetchBuildInfo();
      const data = (result.data != null) ? result.data : JSON.parse(result.content);

      return {
        status: 'success',
        data: data
      };
    } catch (e) {
      console.error(`ERROR: Couldn't get build informations: ${e}`);
      return {
        status: 'error',
        error: e
      };
    }
  }

});

