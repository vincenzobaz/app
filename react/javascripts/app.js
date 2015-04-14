'use strict';

require('es6ify/node_modules/traceur/bin/traceur-runtime');
require('./rock-hammer');

// Expose React to enable the React Dev Tools.
var React = window.React = require('react'),
    Main = require('./lib/handlers/Main'),
    Footer = require('./lib/components/Footer'),
    ErrorStore = require('./lib/stores/ErrorStore'),
    ErrorHandler = require('./lib/components/ErrorHandler'),
    debug = window.debug = require('debug');

var $$ = document.getElementById.bind(document);

var App = {
  run() {
    ErrorStore.register();

    this.subscribe();

    React.render(<Main />, $$('app'));
    React.render(<ErrorHandler store={ErrorStore} />, $$('error'));
  },

  subscribe() {
    debug('Subscribing...');
    Meteor.subscribe('userServices');
  }
};

Meteor.startup(() => App.run());

