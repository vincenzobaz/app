
'use strict';

var React = require('react'),
    QuestionsModal = require('../components/modals/QuestionsModal');

class ModalFactory {

  constructor(game, onRequestHide) {
    this.game = game;
    this.onRequestHide = onRequestHide;
  }

  makeModal(tile) {
    return (
      <QuestionsModal
        game={this.game}
        tile={tile}
        questions={tile.getQuestions() || []}
        onRequestHide={this.onRequestHide} />
    );
  }

}

module.exports = ModalFactory;

