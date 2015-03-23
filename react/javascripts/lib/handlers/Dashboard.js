/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Players = require('../components/Players'),
    CurrentGames = require('../components/CurrentGames'),
    JoinRequests = require('../components/JoinRequests');

var Dashboard = React.createClass({

  render() {
    return (
      <div>
        <Players game={this.props.currentGame} user={this.props.user} />
        <div className="grid-container">
          <div className="grid-20">
            <div className="notifications">
              <CurrentGames games={this.props.games} />
            </div>
          </div>
          <div className='grid-50 prefix-5'>
            {this.props.children}
          </div>
          <div className='grid-20 prefix-5'>
            <div className='notifications'>
              <JoinRequests requests={this.props.joinRequests} />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Dashboard;
