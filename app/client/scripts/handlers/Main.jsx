
'use strict';

import {getAppState} from './../appState.jsx';
import {Stats} from './Stats.jsx';
import {Welcome} from './Welcome.jsx';
import {About} from './About.jsx';
import {Account} from './Account.jsx';
import {PlayGame} from './PlayGame.jsx';
import {Home} from './Home.jsx';
import {Dashboard} from './Dashboard.jsx';

var React = require('react'),
    debug = require('debug')('Main');

var Main = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      pages: {
        stats: Stats,
        welcome: Welcome,
        about: About,
        account: Account,
        game: PlayGame
      },
    }
  },

  getMeteorData() {
    return getAppState();
  },

  render() {
    if (this.data.isLoggedIn) {
      return this.renderDashboard();
    }

    return this.renderHome();
  },

  renderHome() {
    return <Home />;
  },

  renderDashboard() {
    return (
      <Dashboard {...this.data}>
        {this.renderInner()}
      </Dashboard>
    );
  },

  renderInner() {
    var page = (this.state.pages[this.data.page]) ? this.data.page : 'welcome';

    if (page === 'game' && this.data.currentGame == null) {
      page = 'welcome';
    }

    const Page = this.state.pages[page];

    return <Page {...this.data} />;
  }

});

module.exports = {
  Main: Main
};
