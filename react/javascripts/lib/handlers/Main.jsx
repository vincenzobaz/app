
'use strict';

var React = require('react'),
    ReactMeteor = require('../third-party/react-meteor'),
    PlayGame = require('./PlayGame'),
    Home = require('./Home'),
    Dashboard = require('./Dashboard'),
    Welcome = require('./Welcome'),
    Stats = require('./Stats'),
    FacebookStore = require('../stores/FacebookStore'),
    getAppState = require('../appState'),
    debug = require('debug')('Main');

var Main = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return getAppState();
  },

  render() {
    debug(this.state);
    if (this.state.isLoggedIn) {
      return this.renderDashboard();
    }

    return this.renderHome();
  },

  renderHome() {
    return <Home />;
  },

  renderDashboard() {
    return (
      <Dashboard {...this.state}>
        {this.renderInner()}
      </Dashboard>
    );
  },

  renderInner() {
    if (this.state.page === 'stats') {
      debug('Rendering stats');
      return <Stats {...this.state} />;
    }

    if (this.state.currentGame != null) {
      debug('Rendering PlayGame', this.state.currentGame);
      return <PlayGame {...this.state} />;
    }

    debug('Rendering Welcome');
    return <Welcome {...this.state} />;
  }

});

module.exports = Main;
