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
import {getConfig} from "../helpers/getConfig";
import {FacebookService, MeteorUser} from "../../server/MeteorUser";
import {GameService} from "../../server/services/GameService";


interface FBGameRequestResponse {
  request: string;
  to: string[];
}

interface GameToolbarProps {
  game?: Game;
}

interface GameToolbarState {
  showQuitGameModal?: boolean;
  showAccountSettings?: boolean;
  showGameRequestInfoModal?: boolean;
}


export class GameToolbar extends React.Component<GameToolbarProps, GameToolbarState> {

  constructor(props: GameToolbarProps) {
    super(props);

    this.state = {
      showQuitGameModal: false,
      showAccountSettings: false,
      showGameRequestInfoModal: false
    };
  }

  onClickRequestButton() {
    let conf = getConfig('facebook');
    let requestDialogParams: RequestsDialogParams = {
      app_id: conf.appId,
      filters: null,
      method: 'apprequests',
      message: 'Do you want to reminisce with me?',
      title: 'Select friends you would like to play with',
      max_recipients: 10
    };

    FB.ui(requestDialogParams, (response: FBGameRequestResponse) => {
        
        if (response) {
          const user = Meteor.user() as MeteorUser;
          const fbUserId = user.services.facebook.id;
          response.to.forEach(toFbId => {
            Meteor.call('JoinRequest.send', response.request, fbUserId, toFbId);
          })
        } else {
          this.setState({
            showGameRequestInfoModal: true
          })
        }

      }
    );
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
          onRequestHide={(() => {})}/>
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
            {this.renderPleaseClickOnDoneModal()}
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

  renderPleaseClickOnDoneModal() {
    const hideModal = () => {this.setState({showGameRequestInfoModal: false})};
    return (
      <div>
        <Modal show={this.state.showGameRequestInfoModal} backdrop={true} onHide={hideModal.bind(this)}>

          <Modal.Body className="centered" >
            Please click on <Button className="facebook-done-button" onClick={hideModal.bind(this)}>Done</Button> once you selected the friends to invite
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

