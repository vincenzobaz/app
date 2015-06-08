
'use strict';

var React = require('react'),
    ReactMeteor = require('../third-party/react-meteor'),
    PlayGame = require('./PlayGame'),
    Home = require('./Home'),
    Dashboard = require('./Dashboard'),
    Welcome = require('./Welcome'),
    Stats = require('./Stats'),
    About = require('./About'),
    Account = require('./Account'),
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

  pages: {
    stats: Stats,
    welcome: Welcome,
    about: About,
    account: Account,
    game: PlayGame
  },

  renderInner() {
    var page = (this.pages[this.state.page]) ? this.state.page : 'welcome';

    if (page === 'game' && this.state.currentGame == null) {
      page = 'welcome';
    }

    const Page = this.pages[page];

    return <Page {...this.state} />;
  }

});

module.exports = Main;
