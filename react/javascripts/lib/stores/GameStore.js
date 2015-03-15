
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
    var id = Games.insert({opponent: opponent});
    return this.byId(id);
  },

  load(id) {
    var game = Games.findOne(id).fetch();
    return hydrate(game);
  },

  quit(game) {
    debug("quit() is not implemented");
  }

};

module.exports = GameStore;

