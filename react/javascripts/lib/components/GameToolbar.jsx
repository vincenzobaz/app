
'use strict';

var React = require('react'),
    FriendsAutocomplete = require('./FriendsAutocomplete'),
    GameStore = require('../stores/GameStore'),
    UserStore = require('../stores/UserStore'),
    Bootstrap = require('react-bootstrap'),
    ModalTrigger = Bootstrap.ModalTrigger,
    QuitGameModal = require('./modals/QuitGameModal'),
    StartGameModal = require('./modals/StartGameModal'),
    debug = require('debug')('GameToolbar');

var GameToolbar = React.createClass({

  getInitialState() {
    return {
      showStartModal: false,
      friend: null
    };
  },

  onFriendSelect(friend) {
    debug('friend', friend);
    this.setState({
      friend,
      showStartModal: true
    });
  },

  /* eslint no-underscore-dangle: 0 */
  startGame(friend) {
    GameStore.start(friend._id)
      .then(res => {
        debug('after starGame:', res);
        Session.set('page', 'game');
        if (res.status !== 'success') {
          // TODO: Show error modal.
        }
      });
  },

  onStart() {
    this.setState({ showStartModal: false});
    this.startGame(this.state.friend);
  },

  onAbortStart() {
    this.setState({
      showStartModal: false,
      friend: null
    });
  },

  onQuit() {
    debug('quit game');
    GameStore.quit(this.props.game);
    Session.set('page', 'home');
  },

  onResume() {
    debug('resume game');
  },

  render() {
    var startModal = '';

    if (this.state.showStartModal && this.state.friend) {
      startModal = <StartGameModal friend={this.state.friend}
                                   onOk={this.onStart}
                                   onCancel={this.onAbortStart} />;
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
