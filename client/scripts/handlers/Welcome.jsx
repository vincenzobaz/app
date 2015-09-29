
'use strict';

var React = require('react'),
    debug = require('debug')('Welcome');

var Welcome = React.createClass({

  propTypes: {
    user: R.Shapes.User.isRequired,
    joinRequests: React.PropTypes.arrayOf(R.Shapes.JoinRequest),
    games: React.PropTypes.arrayOf(R.Shapes.Game)
  },

  switchToTraining(e) {
    e.preventDefault();
    debug('TODO: Switch to training');
  },

  render() {
    return (
      <div className='welcome'>
        {this.renderWelcomeText()}
        {this.renderTrainingText()}
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
        Welcome{!user.isFirstTime() && ' back'}, {user.getFirstName()}!
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

Reminisce.Welcome = Welcome;
