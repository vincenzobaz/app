import {Button, ButtonGroup, Modal} from 'react-bootstrap';

import {GameStore}      from '../stores/GameStore';
import {FacebookStore}  from '../stores/FacebookStore';
import {JoinRequest}    from '../models/JoinRequest';
import {Game}           from '../models/Game';
import {User}           from '../models/User';
import {TrainingStatus} from '../models/TrainingStatus';

import { Routes }       from '../../common/Routes';

import { responsiveComponent } from '../helpers/responsive';

const isCurrent = (g: Game) => !g.hasEnded && !g.hasFailed && !g.isWaiting;
const isWaiting = (g: Game) => g.isWaiting;
const isPast    = (g: Game) => g.hasEnded || g.hasFailed;

interface WelcomeProps {
  user: User;
  joinRequests: JoinRequest[];
  games: Game[];
  children: any;
}

interface WelcomeState {
  showGameRequestInfoModal: boolean;
}

class MobileWelcome extends React.Component<WelcomeProps, void> {

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.props.children}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className='welcome-header'>
        <img src={Routes.Assets.at('images/reminisce-logo-ios.png')} alt='Reminisce' width='48' height='48' />
    </div>
    );
  }

}

class DesktopWelcome extends React.Component<WelcomeProps, void> {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

const ResponsiveWelcome = responsiveComponent(MobileWelcome, DesktopWelcome);

export class Welcome extends React.Component<WelcomeProps, WelcomeState> {

  constructor(props: WelcomeProps) {
    super(props);

    this.state = {
      showGameRequestInfoModal: false
    };
  }

  switchToTraining(e) {
    e.preventDefault();
    console.error('TODO: Switch to training');
  }

  startBotGame(e) {
    e.preventDefault();
    GameStore.startBotGame();
  }

  render() {
    return (
      <div className='welcome'>
        <ResponsiveWelcome {...this.props}>
          {this.renderWelcomeText()}
          {this.renderJoinRequestsText()}
          {this.renderCurrentGamesText()}
          {this.renderRequestButton()}
          {this.renderPleaseClickOnDoneModal()}
        </ResponsiveWelcome>
      </div>
    );
  }

  renderWelcomeText() {
    const user: User = this.props.user;
    return (
      <p>
        Welcome{!user.firstTime ? ' back' : ''}, {user.firstName}!<br /><br />
      </p>
    );
  }

  renderTrainingText() {
    var user: User = this.props.user;
    var hasntTrainedYet = user.status == TrainingStatus.NotStarted;

    if (hasntTrainedYet) {
      return (
        <p>
          Looks like you have not completed the training yet.
          &nbsp;
          <a href="#" onClick={this.switchToTraining}>{'Let\'s take it!'}</a>
        </p>
      );
    }
  }

  renderJoinRequestsText() {
    var requestsNum = this.props.joinRequests && this.props.joinRequests.length || 0;

    if (!requestsNum) {
      return null;
    }

    return (
      <p>You have {requestsNum} pending join requests!</p>
    );
  }

  renderRequestButton() {
    return (
      <ButtonGroup bsSize="large" className="request-buttons">
        <Button bsStyle="primary" className="request-button" onClick={this.onClickRequestButton.bind(this)}>
          Play with a friend
        </Button>
        <Button onClick={this.startBotGame}>
          Play with a bot
        </Button>
      </ButtonGroup>
    );
  }

  renderCurrentGamesText() {
    if (!this.props.games) {
      return null;
    }

    const curGames     = this.props.games.filter(isCurrent).length;
    const waitingGames = this.props.games.filter(isWaiting).length;

    return (
      <p>You have {curGames} current game(s), and {waitingGames} game(s) waiting.</p>
    );
  }

  onClickRequestButton() {
    FacebookStore.showInviteDialog().then(res => {
      if (!res) {
        this.setState({
          showGameRequestInfoModal: true
        });
      }
    });
  }

  hideGameRequestInfoModal() {
    this.setState({
      showGameRequestInfoModal: false
    });
  }

  renderPleaseClickOnDoneModal() {
    return (
      <div>
        <Modal show={this.state.showGameRequestInfoModal} backdrop={true} onHide={this.hideGameRequestInfoModal.bind(this)}>
          <Modal.Body className="centered">
            <div style={{padding: '30x 20px'}}>
              Please click on
              <br /><br />
              <Button className="facebook-done-button" onClick={this.hideGameRequestInfoModal.bind(this)}>Done</Button>
              <br /><br />
              once you selected the friends to invite
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}

