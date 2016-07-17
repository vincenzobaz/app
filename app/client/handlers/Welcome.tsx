import {GameStore} from '../stores/GameStore';
import {JoinRequest} from "../models/JoinRequest";
import {Game} from "../models/Game";
import {User} from "../models/User";
import {TrainingStatus} from "../models/TrainingStatus";

const isCurrent = (g: Game) => !g.hasEnded && !g.hasFailed && !g.isWaiting;
const isWaiting = (g: Game) => g.isWaiting;
const isPast    = (g: Game) => g.hasEnded || g.hasFailed;

interface WelcomeProps {
  user: User;
  joinRequests: JoinRequest[];
  games: Game[];
}

export class Welcome extends React.Component<WelcomeProps, {}> {

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
        {this.renderWelcomeText()}
        {/* this.renderTrainingText() */}
        {this.renderJoinRequestsText()}
        {this.renderCurrentGamesText()}
      </div>
    );
  }

  renderWelcomeText() {
    const user: User = this.props.user;
    return (
      <p>
        Welcome{!user.firstTime ? ' back' : ''}, {user.firstName}!<br /><br />
        How about <a href="#" onClick={this.startBotGame}>playing a game with one of our bot?</a>
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
      return <span></span>;
    }

    return (
      <p>You have {requestsNum} pending join requests!</p>
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

}

