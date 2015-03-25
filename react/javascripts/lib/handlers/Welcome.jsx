
'use strict';

var React = require('react'),
    shapes = require('../components/shapes'),
    debug = require('debug')('Welcome');

var Welcome = React.createClass({

  propTypes: {
    user: shapes.user.isRequired,
    joinRequests: React.PropTypes.arrayOf(shapes.joinRequest),
    games: React.PropTypes.arrayOf(shapes.game)
  },

  switchToTraining() {
    debug('TODO: Switch to training');
  },

  render() {
    return (
      <div className='welcome'>
        {this._renderWelcomeText()}
        {this._renderTrainingText()}
        {this._renderJoinRequestsText()}
        {this._renderCurrentGamesText()}
      </div>
    );
  },

  _renderWelcomeText() {
    return (
      <p>
        Welcome{!this.props.user.firstTime && ' back'}, {this.props.user.firstName}!
      </p>
    );
  },

  _renderTrainingText() {
    var user = this.props.user;
    var hasntTrainedYet = user.trainingStatus && user.trainingStatus === 'not started';

    if (hasntTrainedYet) {
      return (
        <p>
          Looks like you have not completed the training yet.
          &nbsp;
          <a href={this.switchToTraining()}>{'Let\'s take it!'}</a>
        </p>
      );
    }
  },

  _renderJoinRequestsText() {
    var requestsNum = this.props.joinRequests && this.props.joinRequests.length || 0;

    if (!requestsNum) {
      return '';
    }

    return (
      <p>You have {requestsNum} join requests!</p>
    );
  },

  _renderCurrentGamesText() {
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
