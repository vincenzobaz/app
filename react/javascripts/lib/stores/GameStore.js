
'use strict';

var Game = require('../models/Game');
var debug = require('debug')('GameStore');
var GameSession = require('../helpers/NamespacedSession')('GameStore');

function hydrate(game) {
  return new Game(game);
}

var GameStore = {

  currentId() {
    return GameSession.get('currentId');
  },

  current() {
    return GameSession.get('current');
  },

  list() {
    return Games.find().fetch().map(hydrate);
  },

  start(opponent) {
    debug("start() is not implemented");
    // Meteor.call('Game.start', opponent.getId(), (id) => {
    //   GameSession.set('currentId', id);
    //   GameSession.set('current', this.load(id));
    // });
  },

  load(id) {
    var game = Games.findOne(id).fetch();
    return hydrate(game);
  },

  quit(game) {
    debug("quit() is not implemented");
    // Meteor.call('Game.quit', game.getId(), () => {
    //   GameSession.set('currentId', null);
    //   GameSession.set('current', null);
    // });
  },

  switchTo(gameId, isId = true) {
    if (isId) {
      GameSession.set('currentId', gameId);
    }
    else {
      GameSession.set('current', gameId);
    }
  }

};

module.exports = GameStore;

