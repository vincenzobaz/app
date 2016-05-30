import {Row, Col, Button, Modal} from 'react-bootstrap';
import {browserHistory}          from 'react-router';

import {sendAppRequest}   from '../helpers/facebook/appRequest';

import {Game}             from '../models/Game';
import {Routes}           from '../../common/Routes';
import {Friend}           from '../../common/models/Friend';
import {Friends}          from '../../common/collections/Friends';
import {GameStore}        from '../stores/GameStore';
import {JoinRequestStore} from '../stores/JoinRequestStore';
import {QuitGameModal}    from './modals/QuitGameModal';
import {StartGameModal}   from './modals/StartGameModal';
import {FriendsSearchbox} from './FriendsSearchbox';
import {AccountSettings}  from './AccountSettings';

interface GameToolbarProps {
  game: Game;
}

interface GameToolbarState {
  showQuitGameModal: boolean;
  showAccountSettings: boolean;
}

export class GameToolbar extends React.Component<GameToolbarProps, GameToolbarState> {

  constructor(props: GameToolbarProps) {
    super(props);

    this.state = {
      showQuitGameModal: false,
      showAccountSettings: false
    };
  }

  onClickRequestButton() {
    const p = sendAppRequest({
      message: 'Do you want to reminisce with me?',
      max_recipients: 1
    });

    p
      .then((req) => {
        console.log(req);
        // FacebookStore.storeRequest(req);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  onClickSettingsButton() {
    this.setState({
      showQuitGameModal: this.state.showQuitGameModal,
      showAccountSettings: true
    });
  }

  onQuit() {
    GameStore.quit(this.props.game);
    browserHistory.push(Routes.Page.home());
  }

  onResume() {

  }

  onHideAccountModal() {
    this.setState({
      showQuitGameModal: this.state.showQuitGameModal,
      showAccountSettings: false
    })
  }

  renderModal() {
    if (this.state.showQuitGameModal && this.props.game) {
      return (
        <QuitGameModal
          show={this.state.showQuitGameModal && this.props.game != null}
          game={this.props.game}
          onQuit={this.onQuit.bind(this)}
          onResume={this.onResume.bind(this)}
          onRequestHide={(() => {})} />
      );
    }

    if (this.state.showAccountSettings) {
      return (
        <Modal show={this.state.showAccountSettings} onHide={this.onHideAccountModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Account Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AccountSettings />
          </Modal.Body>
        </Modal>
      );
    }
  }

  render() {
    return (
      <div>
        <Row>
          <div className="game-toolbar">
            {this.renderRequestButton()}
            {this.renderSettingsButton()}
            {this.renderModal()}
          </div>
        </Row>
      </div>
    );
  }

  renderRequestButton() {
    return (
      <Button className="request-button" onClick={this.onClickRequestButton.bind(this)}>
        Play with a friend
      </Button>
    );
  }

  renderSettingsButton() {
    return (
      <Button className="settings-button" onClick={this.onClickSettingsButton.bind(this)}>
        <i className='fa fa-cog fa-2x'></i>
      </Button>
    );
  }

}

