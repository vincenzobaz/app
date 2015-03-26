
'use strict';

var Game = require('../models/Game');
var debug = require('debug')('GameStore');

function hydrate(game) {
  return new Game(game);
}

var GameStore = {

  list() {
    return Games.find().fetch().map(hydrate);
  },

  start(opponent) {
    debug("start() is not implemented");
    // Meteor.call('Game.start', opponent.getId(), (id) => {
    //   Session.set('currentGameId', id);
    //   Session.set('currentGame', this.load(id));
    // });
  },

  load(id) {
    var game = Games.findOne(id).fetch();
    return hydrate(game);
  },

  quit(game) {
    debug("quit() is not implemented");
    // Meteor.call('Game.quit', game.getId(), () => {
    //   Session.set('currentGameId', null);
    //   Session.set('currentGame', null);
    // });
  }

};

module.exports = GameStore;

