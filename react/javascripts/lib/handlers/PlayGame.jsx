
'use strict';

var React = require('react'),
    Board = require('../components/Board'),
    AppState = require('../AppState'),
    GameStore = require('../stores/GameStore'),
    EndGame = require('../components/EndGame'),
    shapes = require('../components/shapes'),
    debug = require('debug')('PlayGame');

// TODO: MOAR REFACTORING!

var PlayGame = React.createClass({

  propTypes: {
    currentGame: shapes.Game
  },

  getInitialState() {
    return {
      currentGame: this.props.currentGame
    };
  },

  render() {
    debug('currentGame',   this.state.currentGame);
    debug('isPlaying',     this.isPlaying());
    debug('inCreation',    this.isCreating());

    const game = this.state.currentGame;
    const gameId = game.getId();

    if (this.hasGameEnded()) {
      return (
        <div>
          <EndGame game={game}
                   localStorageKey={`game-${gameId}-EndGame`} />

          <Board gameId={gameId}
                 game={game}
                 tiles={game.getTiles()} />
        </div>
      )
    }

    if (this.isPlaying()) {
      return (
        <div>
          <Board gameId={gameId}
                 game={game} />
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

    return <p style={style}>This game is still being created, please check again in a few minutes.</p>
  },

  renderWaiting() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return <p style={style}>We are still waiting for your opponent to accept your join request.</p>
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
    var game = this.state.currentGame;

    if (game == null) {
      return defValue;
    }

    return fn(game);
  }

});

module.exports = PlayGame;
