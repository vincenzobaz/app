'use strict';

require('./rock-hammer');

// Expose React to enable the React Dev Tools.
var React = window.React = require('react'),
    Main = require('./lib/handlers/Main'),
    ErrorStore = require('./lib/stores/ErrorStore'),
    ModalManager = require('./lib/stores/ModalManager'),
    ErrorHandler = require('./lib/components/ErrorHandler'),
    ModalHandler = require('./lib/components/ModalHandler'),
    debug = window.debug = require('debug');

var $$ = document.getElementById.bind(document);

var App = {
  run() {
    ErrorStore.register();

    this.subscribe();

    React.render(<ErrorHandler store={ErrorStore} />, $$('error'));
    React.render(<Main />, $$('app'));
    React.render(<ModalHandler manager={ModalManager} />, $$('modal'));
  },

  subscribe() {
    debug('Subscribing to Meteor channels...');

    Meteor.subscribe('games');
    Meteor.subscribe('gameBoards');
    Meteor.subscribe('joinRequests');
    Meteor.subscribe('userServices');
    Meteor.subscribe('friends');
    Meteor.subscribe('gameStats');
  }
};

Meteor.startup(() => App.run());

