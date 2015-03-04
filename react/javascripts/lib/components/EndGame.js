
/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Modal = require('react-bootstrap').Modal,
    LocalStorageMixin = require('react-localstorage');

var EndGame = React.createClass({

  mixins: [LocalStorageMixin],

  getInitialState() {
    return {
      hidden: false
    };
  },

  render() {
    if (this.state.hidden) {
      return <noscript />;
    }

    return (
      <Modal backdrop={true} animation={true} className='end-game' onRequestHide={this.onRequestHide}>
        <div className='modal-header'>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={this.onRequestHide}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <h3>
            {this.renderTitle()}
          </h3>
        </div>
        <div className='modal-body'>
          {this.renderBody()}
        </div>
      </Modal>
    );
  },

  renderTitle() {
    if (this.hasWon()) {
      return 'You won!';
    }

    return 'Aww, you lost.';
  },

  renderBody() {
    if (this.hasWon()) {
      return (
        <div>
          <p>Congratulations, you have won the game!</p>
        </div>
      );
    }

    return (
      <div>
        <p>Sorry, you have lost the game.</p>
      </div>
    )
  },

  hasWon() {
    var game = this.props.game;
    var opponent = game.opponent.facebookId;
    var winner = game.winData.wonBy;

    return opponent !== winner;
  },

  onRequestHide() {
    this.setState({
      hidden: true
    });
  }

});

module.exports = EndGame;
