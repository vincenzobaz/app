
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
    if (this.state.isLoggedIn) {
      //return this.renderDashboard();
        return this.renderStats()
    }

    return this.renderHome();
  },

  renderHome() {
    return <Home />;
  },

    renderStats(){
        return <Stats />
    },

  renderDashboard() {
    return (
      <Dashboard {...this.state}>
        {this.renderInner()}
      </Dashboard>
    );
  },

  renderInner() {
    if (this.state.currentGame != null) {
      debug('Rendering PlayGame', this.state.currentGame);
      return <PlayGame {...this.state} />;
    }

    return <Welcome {...this.state} />;
  }

});

module.exports = Main;
