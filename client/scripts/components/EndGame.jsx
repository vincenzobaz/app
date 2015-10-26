
'use strict';

var React = require('react'),
    Modal = require('react-bootstrap').Modal,
    LocalStorageMixin = require('react-localstorage');

const getEndGameDesc = (game) => {
  return {
    props: {
      game: game
    },
    onDismiss: () => {},
    element: EndGame
  };
};

const EndGame = React.createClass({

  mixins: [LocalStorageMixin],

  propTypes: {
    game: R.Shapes.Game
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
    if (this.props.game.isDraw()) {
      return "It's a draw!";
    }

    if (this.props.game.isWon()) {
      return 'You won!';
    }

    return 'Aww, you lost.';
  },

  renderBody() {
    if (this.props.game.isDraw()) {
      return (
        <div>
          <p>Nobody won, but nobody lost either :)</p>
        </div>
      );
    }

    if (this.props.game.isWon()) {
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
    );
  },

  onRequestHide() {
    this.setState({
      hidden: true
    });
  }

});

Reminisce.EndGame = EndGame;
Reminisce.getEndGameDesc = getEndGameDesc;

