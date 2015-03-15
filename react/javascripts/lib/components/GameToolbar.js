
/** @jsx React.DOM */

'use strict';

var React = require('react'),
    FriendsAutocomplete = require('./FriendsAutocomplete'),
    GameStore = require('../stores/GameStore'),
    Router = require('react-router'),
    Bootstrap = require('react-bootstrap'),
    ModalTrigger = Bootstrap.ModalTrigger,
    QuitGameModal = require('./modals/QuitGameModal'),
    AppState = require('../AppState'),
    debug = require('debug')('GameToolbar');

var GameToolbar = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return {
      game: AppState().currentGame
    };
  },

  onFriendSelect(selection) {
    GameStore.start(selection).then(game => {
      Router.transitionTo('play', {gameId: game.gameId});
    });
  },

  onQuit() {
    debug('quit game');
    GameStore.quit(this.state.game);
  },

  onResume() {
    debug('resume game');
  },

  render() {
    return (
      <li className='manage-game right'>
        <span className='start-game'>
          Start new game with
          &nbsp;
          <FriendsAutocomplete onSelect={this.onFriendSelect} />
          &nbsp;
          <i className='icon-check-sign'></i>
        </span>
        &nbsp;
        {this.renderQuitGameButton()}
      </li>
    );
  },

  renderQuitGameButton() {
    if (this.state.game == null) {
      return '';
    }

    return (
      <ModalTrigger modal={<QuitGameModal game={this.state.game} onQuit={this.onQuit} onResume={this.onResume} />}>
        <a role='button' data-toggle='modal' href='#modal-confirm'>
          <i className='icon-signout'></i>
          Quit this game
        </a>
      </ModalTrigger>
    );
  }

});

module.exports = GameToolbar;
