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
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    debug = require('debug')('Main');

var Main = React.createClass({

  getInitialState() {
    return require('../AppState');
  },

  componentWillMount() {
    this.state.on('update', this.onStateUpdate);
    this.fetchInitialState();
  },

  componentWillUnmount() {
    this.state.off('update', this.onStateUpdate);
  },

  onStateUpdate(state) {
    debug('state update', state);
    this.replaceState(state);
  },

  fetchInitialState() {
    UserStore.fetchCurrent();
    JoinRequestStore.list();
    GameStore.list();
  },

  render() {
    return (
      <div>
        <Players game={this.state.currentGame.val()} user={this.state.user.val()} />
        <div className="grid-container">
          <div className="grid-20">
            <div className="notifications">
              <CurrentGames games={this.state.games.val()} />
            </div>
          </div>
          <div className='grid-50 prefix-5'>
            <RouteHandler user={this.state.user.val()}
                                joinRequests={this.state.joinRequests.val()}
                                games={this.state.games.val()}
                                currentGame={this.state.currentGame.val()} />
          </div>
          <div className='grid-20 prefix-5'>
            <div className='notifications'>
              <JoinRequests requests={this.state.joinRequests.val()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Main;
