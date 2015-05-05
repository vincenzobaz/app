
Reminisce.Store.AnswerStore = {

  send(game, tile, answers) {
    Meteor.call('Answer.post',
      game.getId(),
      tile.getId(),
      answers
    );
  },

  timeOut(game, tile) {
    Meteor.call('Answer.timeOut',
      game.getId(),
      tile.getId()
    );
  }

};

