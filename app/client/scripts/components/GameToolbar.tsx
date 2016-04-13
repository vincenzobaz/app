

import {GameStore} from './../stores/GameStore';
import {StartGameModal} from './modals/StartGameModal';
import {QuitGameModal} from './modals/QuitGameModal';
import {FriendsSearchbox} from './FriendsSearchbox';
import {debug} from "util";
import {Friend} from "../../../common/models/Friend";
import {Game} from "../models/Game";
import {Modal, Button} from "react-bootstrap";
import {Friends} from "../../../common/collections/Friends";

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
        <div className='start-game container-fluid'>
          <div className="grid-50">
            Start new game with
          </div>
          <div className="grid-50">
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

