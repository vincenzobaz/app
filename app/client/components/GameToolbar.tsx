import {Row, Col, Button, Modal} from 'react-bootstrap';
import {browserHistory}          from 'react-router';

import {Game}             from '../models/Game';
import {Friend}           from '../../common/models/Friend';
import {Friends}          from '../../common/collections/Friends';
import {GameStore}        from '../stores/GameStore';
import {QuitGameModal}    from './modals/QuitGameModal';
import {StartGameModal}   from './modals/StartGameModal';
import {FriendsSearchbox} from './FriendsSearchbox';
import {AccountSettings}  from './AccountSettings';


interface GameToolbarProps {
  game: Game;
}

interface GameToolbarState {
  friend: Friend;
  showStartGameModal: boolean;
  showQuitGameModal: boolean;
  showAccountSettings: boolean;
}

export class GameToolbar extends React.Component<GameToolbarProps, GameToolbarState> {

  constructor(props: GameToolbarProps) {
    super(props);

    this.state = {
      friend: null,
      showStartGameModal: false,
      showQuitGameModal: false,
      showAccountSettings: false
    };
  }

  onFriendSelect(friend) {
    this.setState({
      friend: friend,
      showStartGameModal: true,
      showQuitGameModal: false,
      showAccountSettings: false

    });
  }

  onClickQuitGameButton() {

    this.setState({
      friend: this.state.friend,
      showStartGameModal: this.state.showStartGameModal,
      showQuitGameModal: this.state.showQuitGameModal,
      showAccountSettings: true
    });

  }

  startGame(friend) {
    GameStore.start(friend._id);
  }

  onStart() {
    this.setState({
      friend: this.state.friend,
      showStartGameModal: false,
      showQuitGameModal: false,
      showAccountSettings: false
    });

    this.startGame(this.state.friend);
  }

  onAbortStart() {
    this.setState({
      showStartGameModal: false,
      showQuitGameModal: false,
      friend: null,
      showAccountSettings: false
    });
  }

  onQuit() {
    GameStore.quit(this.props.game);
    browserHistory.push('/');
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
        <div>
          <Modal show={this.state.showAccountSettings} onHide={this.onHide.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Account Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AccountSettings />
            </Modal.Body>
          </Modal>
          <Row>
            <div className="game-toolbar">
              <Col sm={3} xsHidden className="start-game" >
                Start new game with
              </Col>
              <Col xs={11} sm={8} className="no-left-padding">
                <FriendsSearchbox onSelect={this.onFriendSelect.bind(this)} />

              </Col>
              <Col xs={1} className="no-left-padding">
                {this.renderQuitGameButton()}
              </Col>
              {this.renderModal()}
            </div>

          </Row>

        </div>
    );
  }

  renderQuitGameButton() {
    return (
        <Button className="settings-button" onClick={this.onClickQuitGameButton.bind(this)}>
          <i className='fa fa-cog fa-2x'></i>
        </Button>
    );
  }
  
  onHide() {
    this.setState({
      friend: this.state.friend,
      showStartGameModal: this.state.showStartGameModal,
      showQuitGameModal: this.state.showQuitGameModal,
      showAccountSettings: false
    })
  }

}

