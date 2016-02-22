
'use strict';

import {Shapes} from './../boot/helpers/shapes.jsx';
import {GameStore} from './../stores/GameStore.jsx';

var React = require('react'),
    debug = require('debug')('Welcome');

var Welcome = React.createClass({

  propTypes: {
    user: Shapes.User.isRequired,
    joinRequests: React.PropTypes.arrayOf(Shapes.JoinRequest),
    games: React.PropTypes.arrayOf(Shapes.Game)
  },

  switchToTraining(e) {
    e.preventDefault();
    debug('TODO: Switch to training');
  },

  startBotGame(e) {
    e.preventDefault();
    GameStore.startBotGame();
  },

  render() {
    return (
      <div className='welcome'>
        {this.renderWelcomeText()}
        {/* this.renderTrainingText() */}
        {this.renderJoinRequestsText()}
        {this.renderCurrentGamesText()}
      </div>
    );
  },

  /* eslint comma-spacing: 0 */
  renderWelcomeText() {
    var user = this.props.user;
    return (
      <p>
        Welcome{!user.isFirstTime() ? ' back' : ''}, {user.getFirstName()}!<br /><br />
        How about <a href="#" onClick={this.startBotGame}>playing a game with one of our bot?</a>
      </p>
    );
  },

  renderTrainingText() {
    var user = this.props.user;
    var hasntTrainedYet = user.getTrainingStatus() === 'not started';

    if (hasntTrainedYet) {
      return (
        <p>
          Looks like you have not completed the training yet.
          &nbsp;
          <a href="#" onClick={this.switchToTraining}>{'Let\'s take it!'}</a>
        </p>
      );
    }
  },

  renderJoinRequestsText() {
    var requestsNum = this.props.joinRequests && this.props.joinRequests.length || 0;

    if (!requestsNum) {
      return '';
    }

    return (
      <p>You have {requestsNum} join requests!</p>
    );
  },

  renderCurrentGamesText() {
    if (!this.props.games) {
      return null;
    }

    const gamesNum = this.props.games.filter(g => !g.hasEnded()).length;

    if (!gamesNum) {
      return null;
    }

    return (
      <p>You have {gamesNum} current games!</p>
    );
  }

});

module.exports = {
  Welcome: Welcome
};
