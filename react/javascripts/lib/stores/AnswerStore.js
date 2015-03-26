
'use strict';

var Routes = require('../Routes');
var AppState = require('../AppState');

var AnswersStore = {

  send(game, tile, answers) {
    debug("send() is not implemented");
    // Meteor.call('Answer.send', {
    //   game: game.getId(),
    //   tile: tile.getId(),
    //   answers: answers
    //
    // });
  },

  timeOut(game, tile) {
    debug("send() is not implemented");
    // Meteor.call('Answer.timeOut', {
    //   game: game.getId(),
    //   tile: tile.getId()
    // });
  }

};

module.exports = AnswersStore;

