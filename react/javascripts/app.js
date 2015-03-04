/** @jsx React.DOM */

'use strict';

require('es6ify/node_modules/traceur/bin/traceur-runtime');
require('./rock-hammer');

// Expose React to enable the React Dev Tools.
var React = window.React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
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

var $$ = document.getElementById.bind(document);

var App = {
  routes: (
    <Route path="/" handler={Main}>
      <DefaultRoute name="home" handler={Home} />
      <Route name="play" path="/play/:gameId/" handler={PlayGame} />
    </Route>
  ),

  run() {
    Router.run(this.routes, Router.HistoryLocation, Handler => {
      React.render(<Handler />, $$('app'));
      React.render(<Footer />, $$('js-footer'));
      // React.render(<ErrorHandler store={ErrorStore} />, $$('error'));
      debug('app')('launched');
    })
  }
};

Meteor.startup(App.run.bind(App));

