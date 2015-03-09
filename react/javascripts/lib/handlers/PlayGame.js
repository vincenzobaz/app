/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Router = require('react-router'),
    Board = require('../components/Board'),
    AppState = require('../AppState'),
    GameStore = require('../stores/GameStore'),
    EndGame = require('../components/EndGame'),
    debug = require('debug')('PlayGame');

// TODO: MOAR REFACTORING!

var PlayGame = React.createClass({

  mixins: [Router.State],

  getInitialState() {
    return AppState;
  },

  render() {
    debug('currentGame',  this.state.currentGame.val());
    debug('gameId',       this.getParams().gameId);
    debug('isPlaying',  this.isPlayingGame());
    debug('currentGameId', this.isPlayingGame() && this.state.currentGame.val().id);
    debug('inCreation',   this.isGameInCreation());
    debug('willPlay',     this.isPlayingGame() && this.isOnCurrentGame());

    var gameId = this.getParams().gameId;
    var header = <div></div>;

    if (this.isOnCurrentGame() && this.hasGameEnded()) {
      return (
        <div>
          <EndGame game={this.state.currentGame.val()}
                   localStorageKey={`game-${gameId}-EndGame`} />

          <Board gameId={gameId}
                 game={this.state.currentGame.val()}
                 tiles={this.state.currentGame.tiles} />
        </div>
      )
    }

    if (this.isOnCurrentGame() && this.isPlayingGame()) {
      return (
        <div>
          {header}
          <Board gameId={gameId}
                 game={this.state.currentGame.val()} />
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
      .load(gameId)
      .then(this.onGameLoaded);
  },

  onGameLoaded(game) {
    if (!this.isMounted()) {
      this.state.currentGame.set(game);
    }
  },

  onGameUpdate(game) {
    if (!this.isMounted()) {
      this.state.currentGame.set(game);
    }
  },

  isOnCurrentGame() {
    return this.withGame(game => {
      var currentGameId = game.getId();
      var gameId = this.getParams().gameId;

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
    var game = this.state.currentGame.val();

    if (game == null) {
      return defValue;
    }

    return fn(game);
  }

});

module.exports = PlayGame;
