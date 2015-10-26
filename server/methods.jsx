
Meteor.methods({

  fetchData(userId) {
    Server.fetchData(userId);

    return {
      status: 'success'
    };
  },

  fetchGameBoard(userId) {
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

    console.error(`Data deleted with following result:`, result.data.message);

    return {
      status: result.statusCode === 200 ? 'success' : 'error',
      msg: result.data.message
    };
  },

  'JoinRequest.decline'(requestId) {
    return JoinRequestService.decline(requestId);
  },

  'JoinRequest.accept'(requestId) {
    return JoinRequestService.accept(requestId);
  },

  'JoinRequest.send'(friendId) {
    return JoinRequestService.send(this.userId, friendId);
  },

  'Game.start'(gameId) {
    return GameService.start(gameId);
  },

  'Game.quit'(gameId) {
    console.error('Method Game.quit is not implemented yet.');
    return {
      status: 'success'
    };
  },

  'Answer.timeOut'(gameId, tileId) {
    return AnswerService.timeOut(this.userId, gameId, tileId);
  },

  'Answer.post'(gameId, tileId, answers) {
    return AnswerService.post(this.userId, gameId, tileId, answers);
  }

});

