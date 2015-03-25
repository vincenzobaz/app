
'use strict';

var React = require('react'),
    AppState = require('../AppState'),
    Home = require('./Home'),
    Dashboard = require('./Dashboard'),
    Welcome = require('./Welcome'),
    debug = require('debug')('Main'),
    Facebook = require('../helpers/Facebook');

var Main = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return AppState();
  },

  componentDidUpdate() {
    // FIXME: Find a way not to login 2 times
    if (this.state.isLoggedIn && !this.state.fbInited) {
      Facebook.init();
      Session.set('fbInited', true);
    }
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
