
'use strict';

var React = require('react'),
    shapes = require('../components/shapes'),
    debug = require('debug')('Welcome');

var Welcome = React.createClass({

  propTypes: {
    user: shapes.User.isRequired,
    joinRequests: React.PropTypes.arrayOf(shapes.JoinRequest),
    games: React.PropTypes.arrayOf(shapes.Game)
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
    var gamesNum = this.props.games && this.props.games.length || 0;

    if (!gamesNum) {
      return '';
    }

    return (
      <p>You have {gamesNum} current games!</p>
    );
  }

});

module.exports = Welcome;
