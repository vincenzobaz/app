
'use strict';

var React = require('react'),
    debug = require('debug')('PlayGame');

var PlayGame = React.createClass({

  propTypes: {
    currentGame: R.Shapes.Game.isRequired
  },

  componentDidUpdate() {
    if (this.hasGameEnded()) {
      this.showEndModal();
    }
  },

  componentDidMount() {
    if (this.hasGameEnded()) {
      this.showEndModal();
    }
  },

  showEndModal() {
    const endGame = R.getEndGameDesc(this.props.currentGame);
    R.ModalManager.showModal(endGame);
  },

  render() {
    const game = this.props.currentGame;
    const gameId = game.getId();

    if (this.hasGameEnded()) {
      return (
        <div>
          <R.Board gameId={gameId} game={game} />
        </div>
      );
    }

    if (this.isPlaying()) {
      debug('Rendering isPlaying game', game);
      return (
        <div>
          <R.Board gameId={gameId} game={game} />
        </div>
      );
    }

    if (this.isWaiting()) {
      return this.renderWaiting();
    }

    if (this.isCreating()) {
      return this.renderCreating();
    }

    return this.renderNoGame();
  },

  renderNoGame() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return <p style={style}>No game selected.</p>;
  },

  renderCreating() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return (
      <p style={style}>
        This game is still being created, please check again in a few minutes.
      </p>
    );
  },

  renderWaiting() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return (
      <p style={style}>
        We are still waiting for your opponent to accept your join request.
      </p>
    );
  },

  isPlaying() {
    return this.withGame(game => {
      return game.isPlaying();
    }, false);
  },

  isCreating() {
    return this.withGame(game => {
      return game.isCreating();
    }, false);
  },

  isWaiting() {
    return this.withGame(game => {
      return game.isWaiting();
    }, false);
  },

  hasGameEnded() {
    return this.withGame(game => {
      return game.hasEnded();
    }, false);
  },

  withGame(fn, defValue) {
    var game = this.props.currentGame;

    if (game == null) {
      return defValue;
    }

    return fn(game);
  }

});

Reminisce.PlayGame = PlayGame;
