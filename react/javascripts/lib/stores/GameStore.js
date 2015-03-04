
'use strict';

var getJSON = require('../helpers/getJSON');
var postJSON = require('../helpers/postJSON');
var State = require('../AppState');
var Routes = require('../Routes');
var Game = require('../models/Game');
var debug = require('debug')('GameStore');

function _start(opponentId) {
  debug('Re-implement GameStore.start');
  return Promise.resolve('a5c85cd2-9cd8-4960-b359-8f53ad05b8bc');
  var url = Routes.API.Games.start().url;
  return postJSON(url, {
    opponentId: opponentId
  });
}

function _quit(game) {
  debug('Re-implement GameStore.quit');
  var url = Routes.API.Games.quit().url;
  return postJSON(url, {
    gameId: game.getId()
  });
}

function _fetchAll() {
  debug('Re-implement GameStore.fetchAll');
  var url = Routes.Assets.at('json/currentGames.json').url;
  // var url = Routes.API.Games.list().url
  return getJSON(url);
}

function _fetchById(id) {
  debug('Re-implement GameStore.fetchById');
  var url = Routes.Assets.at(`json/games/${id}.json`).url;
  // var url = Routes.API.Games.details(id).url;
  return getJSON(url);
}

function _refresh() {
  return _fetchAll().then(games => {
    games = games.map(_hydrate);
    State.add('games', games);
    return games;
  });
}

function _hydrate(game) {
  return new Game(game);
}

var GameStore = {

  list() {
    return _refresh();
  },

  start(opponent) {
    return _start(opponent)
      .then(res => this.load(res.gameId));
  },

  load(id) {
    return _fetchById(id)
      .then(game => _hydrate(game));
  },

  quit(game) {
    return _quit(game);
  }

};

module.exports = GameStore;
