
'use strict';

var postJSON = require('../helpers/postJSON');
var Routes = require('../Routes');
var AppState = require('../AppState');
var withToken = require('../helpers/withToken')(AppState);

var AnswersStore = {

  send(gameId, tile, answers) {
    var url = Routes.API.Answers.send();

    return postJSON(url, withToken({
      gameId: gameId,
      tileId: tile.getId(),
      answers: answers
    }));
  },

  timeOut(gameId, tile) {
    var url = Routes.API.Answers.timeOut();

    return postJSON(url, withToken({
      gameId: gameId,
      tileId: tile.getId()
    }));
  }

};

module.exports = AnswersStore;
