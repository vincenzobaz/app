
'use strict';

var React = require('react'),
    FriendsAutocomplete = require('./FriendsAutocomplete'),
    GameStore = require('../stores/GameStore'),
    Bootstrap = require('react-bootstrap'),
    ModalTrigger = Bootstrap.ModalTrigger,
    QuitGameModal = require('./modals/QuitGameModal'),
    debug = require('debug')('GameToolbar'),
    shapes = require('./shapes');

var GameToolbar = React.createClass({

  propTypes: {
    game: shapes.Game
  },

  onFriendSelect(selection) {
    GameStore.start(selection).then(game => {
      debug('TODO: Switch to new game');
    });
  },

  onQuit() {
    debug('quit game');
    GameStore.quit(this.props.game);
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
    if (this.props.game == null) {
      return '';
    }

    return (
      <ModalTrigger modal={<QuitGameModal game={this.props.game} onQuit={this.onQuit} onResume={this.onResume} />}>
        <a role='button' data-toggle='modal' href='#modal-confirm'>
          <i className='icon-signout'></i>
          Quit this game
        </a>
      </ModalTrigger>
    );
  }

});

module.exports = GameToolbar;