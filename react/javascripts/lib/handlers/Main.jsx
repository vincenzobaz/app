
'use strict';

/*jshint -W079 */
var React = require('react'),
    AppState = require('../AppState'),
    Home = require('./Home'),
    Dashboard = require('./Dashboard'),
    Welcome = require('./Welcome'),
    debug = require('debug')('Main');

var Main = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return AppState();
  },

  render() {
    if (this.state.isLoggedIn) {
      return this.renderDashboard();
    }

    return this.renderHome()
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
    if (this.state.currentGameId != null) {
      return <PlayGame {...this.state} />;
    }

    return <Welcome {...this.state} />;
  }

});

module.exports = Main;
