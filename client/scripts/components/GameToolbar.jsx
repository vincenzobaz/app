
'use strict';

var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    ModalTrigger = Bootstrap.ModalTrigger,
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
    R.Store.GameStore.start(friend._id);
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
    R.Store.GameStore.quit(this.props.game);
    Session.set('page', 'home');
  },

  onResume() {
    debug('resume game');
  },

  render() {
    var startModal = '';

    if (this.state.showStartModal && this.state.friend) {
      startModal = <R.StartGameModal friend={this.state.friend}
                                   onOk={this.onStart}
                                   onCancel={this.onAbortStart} />;
    }

    return (
      <span>
        <span className='start-game'>
          Start new game with
          &nbsp;
          <R.FriendsAutocomplete onSelect={this.onFriendSelect} />
          {/* &nbsp; <i className='icon-check-sign'></i> */}
        </span>
        &nbsp;
        {this.renderQuitGameButton()}
        {startModal}
      </span>
    );
  },

  renderQuitGameButton() {
    if (this.props.game == null) {
      return '';
    }

    return (
      <ModalTrigger modal={<R.QuitGameModal game={this.props.game} onQuit={this.onQuit} onResume={this.onResume} />}>
        <a role='button' data-toggle='modal' href='#modal-confirm'>
          <i className='icon-signout'></i>
          Quit this game
        </a>
      </ModalTrigger>
    );
  }

});

Reminisce.GameToolbar = GameToolbar;
