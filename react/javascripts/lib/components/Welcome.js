/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Link = require('react-router').Link,
    shapes = require('./shapes');

var Welcome = React.createClass({

  propTypes: {
    user: shapes.user.isRequired,
    joinRequests: React.PropTypes.arrayOf(shapes.joinRequest),
    games: React.PropTypes.arrayOf(shapes.game)
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
          <Link to='/training'>{'Let\'s take it!'}</Link>
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
