
'use strict';

var React = require('react'),
    ReactMeteor = require('../third-party/react-meteor'),
    FriendsAutocomplete = require('./FriendsAutocomplete'),
    GameStore = require('../stores/GameStore'),
    UserStore = require('../stores/UserStore'),
    Bootstrap = require('react-bootstrap'),
    ModalTrigger = Bootstrap.ModalTrigger,
    QuitGameModal = require('./modals/QuitGameModal'),
    StartGameModal = require('./modals/StartGameModal'),
    AppState = require('../AppState'),
    debug = require('debug')('GameToolbar');

// TODO: Lots of refactoring.
var GameToolbar = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return {
      showStartModal: Session.get('GameToolbar.showStartModal'),
      friend: Session.get('GameToolbar.friend')
    };
  },

  onFriendSelect(friendId) {
    friendId = '1550704362';
    var friend = UserStore.byFacebookId(friendId);
    Session.set('GameToolbar.friend', friend);
    Session.set('GameToolbar.showStartModal', true);
  },

  startGame(friend) {
    GameStore.start(friend.id).then(game =>
      Session.set('currentGame', game)
    );
  },

  onStart() {
    Session.set('GameToolbar.showStartModal', false);
    this.startGame(this.state.friend);
  },

  onAbortStart() {
    Session.set('GameToolbar.showStartModal', false);
    Session.set('GameToolbar.friend', null);
  },

  onQuit() {
    debug('quit game');
    GameStore.quit(this.props.game);
  },

  onResume() {
    debug('resume game');
  },

  render() {
    var startModal = '';
    if (this.state.showStartModal && this.state.friend) {
      startModal = <StartGameModal opponent={this.state.friend.profile}
                                   onOk={this.onStart}
                                   onCancel={this.onAbortStart}
                                   onRequestHide={this.onAbortStart} />;
    }

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
        {startModal}
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
