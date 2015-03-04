/** @jsx React.DOM */

'use strict';

require('es6ify/node_modules/traceur/bin/traceur-runtime');
require('./rock-hammer');

// Expose React to enable the React Dev Tools.
var React = window.React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    Routes = Router.Routes,
    Main = require('./lib/handlers/Main'),
    Home = require('./lib/handlers/Home'),
    PlayGame = require('./lib/handlers/PlayGame'),
    Footer = require('./lib/components/Footer'),
    ErrorStore = require('./lib/stores/ErrorStore'),
    ErrorHandler = require('./lib/components/ErrorHandler'),
    debug = window.debug = require('debug');

var Facebook = require('./lib/helpers/Facebook');

ErrorStore.register();
// Facebook.init();

var App = React.createClass({

  render() {
    return (
      <Routes location="history">
        <Route name="main"  handler={Main}>
          <Route name="home" path="/" handler={Home} />
          <Route name="play" path="/play/:gameId/" handler={PlayGame} />
        </Route>
      </Routes>
    );
  }
});

var $$ = document.getElementById.bind(document);

if (Meteor.isClient) {
  Meteor.startup(() => {
    React.renderComponent(<App />, $$('app'));
    React.renderComponent(<Footer />, $$('js-footer'));
    // React.renderComponent(<ErrorHandler store={ErrorStore} />, $$('error'));
    debug('app')('launched');
  })
}


