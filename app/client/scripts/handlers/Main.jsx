
'use strict';

import {getAppState} from './../appState';
import {Stats} from './Stats';
import {Welcome} from './Welcome';
import {About} from './About';
import {Account} from './Account';
import {PlayGame} from './PlayGame';
import {Home} from './Home';
import {Dashboard} from './Dashboard';

var React = require('react'),
    debug = require('debug')('Main');

var Main = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      pages: {
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
