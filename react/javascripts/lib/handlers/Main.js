/** @jsx React.DOM */

'use strict';

/*jshint -W079 */
var React = require('react'),
    Players = require('../components/Players'),
    CurrentGames = require('../components/CurrentGames'),
    JoinRequests = require('../components/JoinRequests'),
    JoinRequestStore = require('../stores/JoinRequestStore'),
    GameStore = require('../stores/GameStore'),
    UserStore = require('../stores/UserStore'),
    AppState = require('../AppState'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    debug = require('debug')('Main');

var Main = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return AppState();
  },

  render() {
    return (
      <div>
        <Players game={this.state.currentGame} user={this.state.user} />
        <div className="grid-container">
          <div className="grid-20">
            <div className="notifications">
              <CurrentGames games={this.state.games} />
            </div>
          </div>
          <div className='grid-50 prefix-5'>
            <RouteHandler user={this.state.user}
                                joinRequests={this.state.joinRequests}
                                games={this.state.games}
                                currentGame={this.state.currentGame} />
          </div>
          <div className='grid-20 prefix-5'>
            <div className='notifications'>
              <JoinRequests requests={this.state.joinRequests} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Main;
