/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Board = require('../components/Board'),
    AppState = require('../AppState'),
    GameStore = require('../stores/GameStore'),
    EndGame = require('../components/EndGame'),
    debug = require('debug')('PlayGame');

// TODO: MOAR REFACTORING!

var PlayGame = React.createClass({

  getInitialState() {
    return {
      currentGame: this.props.currentGame
    };
  },

  render() {
    debug('currentGame',   this.state.currentGame);
    debug('gameId',        this.state.currentGameId);
    debug('isPlaying',     this.isPlayingGame());
    debug('currentGameId', this.isPlayingGame() && this.state.currentGame.id);
    debug('inCreation',    this.isGameInCreation());
    debug('willPlay',      this.isPlayingGame() && this.isOnCurrentGame());

    var gameId = this.state.currentGameId;
    var header = <div></div>;

    if (this.isOnCurrentGame() && this.hasGameEnded()) {
      return (
        <div>
          <EndGame game={this.state.currentGame}
                   localStorageKey={`game-${gameId}-EndGame`} />

          <Board gameId={gameId}
                 game={this.state.currentGame}
                 tiles={this.state.currentGame.tiles} />
        </div>
      )
    }

    if (this.isOnCurrentGame() && this.isPlayingGame()) {
      return (
        <div>
          {header}
          <Board gameId={gameId}
                 game={this.state.currentGame} />
        </div>
      );
    }

    if (this.isOnCurrentGame() && this.isGameInCreation()) {
      return this.renderGameInCreation();
    }

    if (gameId) {
      this.loadGame(gameId);
    }

    return this.renderNoGame();
  },

  renderNoGame() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em'
    };

    return <p style={style}>No game selected.</p>;
  },

  renderGameInCreation() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em'
    };

    return <p style={style}>This game is still being created, please check again in a few minutes.</p>
  },

  loadGame(gameId) {
    GameStore
      .byId(gameId)
      .then(this.onGameLoaded);
  },

  onGameLoaded(game) {
    if (this.isMounted()) {
      Session.set('currentGame', game);
    }
  },

  isOnCurrentGame() {
    return this.withGame(game => {
      var currentGameId = game.getId();
      var gameId = this.state.currentGameId;

      return currentGameId === gameId;
    }, true);
  },

  isPlayingGame() {
    return this.withGame(game => {
      return game.isPlaying();
    }, false);
  },

  isGameInCreation() {
    return this.withGame(game => {
      return game.isCreating();
    }, false);
  },

  hasGameEnded() {
    return this.withGame(game => {
      return game.status === 'ended';
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
