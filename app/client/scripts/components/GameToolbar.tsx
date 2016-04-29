
import {Modal, Button}    from 'react-bootstrap';

import {Game}             from '../models/Game';
import {Friend}           from '../../../common/models/Friend';
import {Friends}          from '../../../common/collections/Friends';
import {GameStore}        from '../stores/GameStore';
import {QuitGameModal}    from './modals/QuitGameModal';
import {StartGameModal}   from './modals/StartGameModal';
import {FriendsSearchbox} from './FriendsSearchbox';

interface GameToolbarProps {
  game: Game;
}

interface GameToolbarState {
  friend: Friend;
  showStartGameModal: boolean;
  showQuitGameModal: boolean;
}

export class GameToolbar extends React.Component<GameToolbarProps, GameToolbarState> {

  constructor(props: GameToolbarProps) {
    super(props);

    this.state = {
      friend: null,
      showStartGameModal: false,
      showQuitGameModal: false
    };
  }

  onFriendSelect(friend) {
    this.setState({
      friend: friend,
      showStartGameModal: true,
      showQuitGameModal: false
    });
  }

  onClickQuitGameButton() {
    this.setState({
      friend: this.state.friend,
      showQuitGameModal: true,
      showStartGameModal: false
    });
  }

  startGame(friend) {
    GameStore.start(friend._id);
  }

  onStart() {
    this.setState({
      friend: this.state.friend,
      showStartGameModal: false,
      showQuitGameModal: false
    });

    this.startGame(this.state.friend);
  }

  onAbortStart() {
    this.setState({
      showStartGameModal: false,
      showQuitGameModal: false,
      friend: null
    });
  }

  onQuit() {
    GameStore.quit(this.props.game);
    Session.set('page', 'home');
  }

  onResume() {

  }

  renderModal() {
    if (this.state.showStartGameModal && this.state.friend) {
      return (
        <StartGameModal
          friend={this.state.friend}
          onOk={this.onStart.bind(this)}
          onCancel={this.onAbortStart.bind(this)} />
      );
    }

    if (this.state.showQuitGameModal && this.props.game) {
      return (
        <QuitGameModal
          game={this.props.game}
           onQuit={this.onQuit.bind(this)}
           onResume={this.onResume.bind(this)}
           onRequestHide={(() => {})} />
      );
    }
  }

  render() {
    return (
      <div className="game-toolbar">
        <div className="start-game container-fluid">
          <span className="col-sm-6 hidden-xs">
            Start new game with
          </span>
          <div className="col-xs-12 col-sm-6">
            <FriendsSearchbox onSelect={this.onFriendSelect.bind(this)} />
          </div>
        </div>
        {this.renderQuitGameButton()}
        {this.renderModal()}
      </div>
    );
  }

  renderQuitGameButton() {
    if (this.props.game == null) {
      return null;
    }

    return (
      <Button onClick={this.onClickQuitGameButton.bind(this)}>
        <i className='icon-signout'></i>
        Quit this game
      </Button>
    );
  }

}

