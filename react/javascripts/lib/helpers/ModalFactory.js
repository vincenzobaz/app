
/** @jsx React.DOM */

'use strict';

var React = require('react'),
    QuestionsModal = require('../components/modals/QuestionsModal');

React;

class ModalFactory {

  constructor(gameId, onRequestHide) {
    this.gameId = gameId;
    this.onRequestHide = onRequestHide;
  }

  makeModal(tile) {
    return (
      <QuestionsModal
        gameId={this.gameId}
        tile={tile}
        questions={tile.getQuestions() || []}
        onRequestHide={this.onRequestHide} />
    );
  }

}

module.exports = ModalFactory;

