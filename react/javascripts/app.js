/** @jsx React.DOM */

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

var Facebook = require('./lib/helpers/Facebook');

ErrorStore.register();
// Facebook.init();

var $$ = document.getElementById.bind(document);

var App = {
  run() {
    React.render(<Main />, $$('app'));
    React.render(<Footer />, $$('js-footer'));
    // React.render(<ErrorHandler store={ErrorStore} />, $$('error'));
  }
};

Meteor.startup(App.run);

