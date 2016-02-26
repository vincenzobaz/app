'use strict';

import {ErrorStore} from './stores/ErrorStore';
import {ErrorHandler} from './components/ErrorHandler';
import {Main} from './handlers/Main';
import {ModalHandler} from './components/ModalHandler';
import {ModalManager} from './ModalManager';

// Expose React to enable the React Dev Tools.
//
var React = window.React = require('react'),
    debug = window.debug = require('debug');

var $$ = document.getElementById.bind(document);

var App = {
  run() {
    ErrorStore.register();

    this.subscribe();
    this.loadGoogleCharts();
     
    React.render(<ErrorHandler store={ErrorStore} />, $$('error'));
    React.render(<Main />, $$('app'));
    // React.render(<ModalHandler manager={ModalManager} />, $$('modal'));
  },

  subscribe() {
    debug('Subscribing to Meteor channels...');

    Meteor.subscribe('games');
    Meteor.subscribe('gameBoards');
    Meteor.subscribe('joinRequests');
    Meteor.subscribe('userServices');
    Meteor.subscribe('friends');
  },

  loadGoogleCharts() {
    // ...

    const callback = () => {
      Session.set('googleChartsLoaded', true);
    };
  }
};

Meteor.startup(() => App.run());

