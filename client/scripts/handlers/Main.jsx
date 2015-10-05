
'use strict';

var React = require('react'),
    debug = require('debug')('Main');

var Main = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      pages: {
        stats: R.Stats,
        welcome: R.Welcome,
        about: R.About,
        account: R.Account,
        game: R.PlayGame
      },
    }
  },

  getMeteorData() {
    return R.getAppState();
  },

  render() {
    debug(this.data);
    if (this.data.isLoggedIn) {
      return this.renderDashboard();
    }

    return this.renderHome();
  },

  renderHome() {
    return <R.Home />;
  },

  renderDashboard() {
    return (
      <R.Dashboard {...this.data}>
        {this.renderInner()}
      </R.Dashboard>
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

Reminisce.Main = Main;
