
'use strict';

var React = require('react'),
    ReactMeteor = require('../third-party/react-meteor'),
    debug = require('debug')('Main');

var Main = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return R.getAppState();
  },

  render() {
    debug(this.state);
    if (this.state.isLoggedIn) {
      return this.renderDashboard();
    }

    return this.renderHome();
  },

  renderHome() {
    return <R.Home />;
  },

  renderDashboard() {
    return (
      <R.Dashboard {...this.state}>
        {this.renderInner()}
      </R.Dashboard>
    );
  },

  pages: {
    stats: R.Stats,
    welcome: R.Welcome,
    about: R.About,
    account: R.Account,
    game: R.PlayGame
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

Reminisce.Main = Main;
