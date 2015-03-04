/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Board = require('../components/Board'),
    AppState = require('../AppState'),
    GameStore = require('../stores/GameStore'),
    RefreshGame = require('../helpers/RefreshGame'),
    EndGame = require('../components/EndGame'),
    debug = require('debug')('PlayGame');

// TODO: MOAR REFACTORING!

var PlayGame = React.createClass({

  propTypes: {
    params: React.PropTypes.shape({
      gameId: React.PropTypes.string.isRequired
    })
  },

  getInitialState() {
    return AppState;
  },

  componentDidMount() {
    if (!this.isPlayingGame() || this.hasGameEnded()) {
      return;
    }

    this.startRefreshing();
  },

  componentDidUpdate() {
    if (!this.isRefreshingCurrentGame()) {
      this.stopRefreshing();
      this.startRefreshing();
    }
  },

  componentWillUnmount() {
    this.stopRefreshing();
  },

  startRefreshing() {
    var game = this.state.currentGame.val();

    if (!this.isRefreshingCurrentGame()) {
      debug('new refresher');
      this.stopRefreshing();
      this.refresher = new RefreshGame(game, this.onGameUpdate);
    }

    debug('start refresh');
    this.refresher.start();
  },

  stopRefreshing() {
    debug('stop refresh');
    if (this.refresher != null) {
      this.refresher.stop();
    }
  },

  render() {
    debug('currentGame',  this.state.currentGame.val());
    debug('gameId',       this.props.params.gameId);
    debug('currentGame',  this.isPlayingGame() && this.state.currentGame.val().gameId);
    debug('inCreation',   this.isGameInCreation());
    debug('willPlay',     this.isPlayingGame() && this.isOnCurrentGame());

    var gameId = parseInt(this.props.params.gameId);
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
    debug('loading game')
    GameStore
      .load(gameId)
      .then(this.onGameLoaded);
  },

  onGameLoaded(game) {
    debug('load game');
    this.state.currentGame.set(game);
  },

  onGameUpdate(game) {
    debug('update game');
    this.state.currentGame.set(game);
  },

  isRefreshingCurrentGame() {
    return this.withGame(game => {
      if (game == null || this.refresher == null) {
        return false;
      }

      return this.refresher.isRefreshingGame(game)
    }, false);
  },

  hasGameLoaded() {
    return this.state.currentGame.val() != null;
  },

  isOnCurrentGame() {
    return this.withGame(game => {
      var currentGameId = parseInt(game.getId());
      var gameId = parseInt(this.props.params.gameId);

      debug('is on current game', currentGameId === gameId);

      return currentGameId === gameId;
    }, true);
  },

  isPlayingGame() {
    return this.withGame(game => {
      debug('game is playing', game.isPlaying());
      return game.isPlaying();
    }, false);
  },

  isGameInCreation() {
    return this.withGame(game => {
      debug('game is in creation', game.isCreating());
      return game.isCreating();
    }, false);
  },

  hasGameEnded() {
    return this.withGame(game => {
      debug('game has ended', game.status === 'ended');
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
