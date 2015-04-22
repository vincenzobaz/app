
Reminisce.Store.AnswersStore = {

  send(game, tile, answers) {
    Meteor.call('Answer.send', {
      game: game.getId(),
      tile: tile.getId(),
      answers: answers
    });
  },

  timeOut(game, tile) {
    Meteor.call('Answer.timeOut', {
      game: game.getId(),
      tile: tile.getId()
    });
  }

};

