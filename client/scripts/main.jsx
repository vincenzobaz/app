'use strict';

// Expose React to enable the React Dev Tools.
var React = window.React = require('react'),
    debug = window.debug = require('debug');

var $$ = document.getElementById.bind(document);

var App = {
  run() {
    R.ErrorStore.register();

    this.subscribe();
    this.loadGoogleCharts();

    React.render(<R.ErrorHandler store={R.ErrorStore} />, $$('error'));
    React.render(<R.Main />, $$('app'));
    React.render(<R.ModalHandler manager={R.ModalManager} />, $$('modal'));
  },

  subscribe() {
    debug('Subscribing to Meteor channels...');

    Meteor.subscribe('games');
    Meteor.subscribe('gameBoards');
    Meteor.subscribe('joinRequests');
    Meteor.subscribe('userServices');
    Meteor.subscribe('friends');
    Meteor.subscribe('gameStats');
  },

  loadGoogleCharts() {
    // ...

    const callback = () => {
      Session.set('googleChartsLoaded', true);
    };
  }
};

Meteor.startup(() => App.run());

