
const MeteorCall = Promise.promisify(R.Meteor.call, R.Meteor);

Reminisce.Store.AnswerStore = {

  send(game, tile, answers) {
    return MeteorCall('Answer.post',
      game.getId(),
      tile.getId(),
      answers
    );
  },

  timeOut(game, tile) {
    return MeteorCall('Answer.timeOut',
      game.getId(),
      tile.getId()
    );
  }

};

