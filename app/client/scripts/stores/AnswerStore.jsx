
const MeteorCall = Promise.promisify(Meteor.call, Meteor);

export const AnswerStore = {

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

