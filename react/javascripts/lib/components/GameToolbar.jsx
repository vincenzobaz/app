
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
    GameToolbarSession = require('../helpers/NamespacedSession')('GameToolbar'),
    debug = require('debug')('GameToolbar');

// TODO: Lots of refactoring.
var GameToolbar = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return {
      showStartModal: GameToolbarSession.get('showStartModal'),
      friend: GameToolbarSession.get('friend')
    };
  },

  onFriendSelect(friendId) {
    friendId = Meteor.userId();
    var friend = UserStore.byId(friendId);
    GameToolbarSession.set('friend', friend);
    GameToolbarSession.set('showStartModal', true);
  },

  /* eslint no-underscore-dangle: 0 */
  startGame(friend) {
    GameStore.start(friend._id);
  },

  onStart() {
    GameToolbarSession.set('showStartModal', false);
    this.startGame(this.state.friend);
  },

  onAbortStart() {
    GameToolbarSession.set('showStartModal', false);
    GameToolbarSession.set('friend', null);
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
      const friend = UserStore.hydrate(this.state.friend);

      startModal = <StartGameModal opponent={friend}
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
