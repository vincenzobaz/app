
'use strict';

var React = require('react'),
    Modal = require('react-bootstrap').Modal,
    LocalStorageMixin = require('react-localstorage'),
    shapes = require('./shapes');

var EndGame = React.createClass({

  mixins: [LocalStorageMixin],

  propTypes: {
    currentGame: shapes.Game
  },

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
    if (this.haveWon()) {
      return 'You won!';
    }

    return 'Aww, you lost.';
  },

  renderBody() {
    if (this.haveWon()) {
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

  haveWon() {
    var game = this.props.game;
    return game.isWonBy(game.getOpponent());
  },

  onRequestHide() {
    this.setState({
      hidden: true
    });
  }

});

module.exports = EndGame;
