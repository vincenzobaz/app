'use strict';

import {ErrorStore} from './stores/ErrorStore.jsx';
import {ErrorHandler} from './components/ErrorHandler.jsx';
import {Main} from './handlers/Main.jsx';
import {ModalHandler} from './components/ModalHandler.jsx';
import {ModalManager} from './ModalManager.jsx';

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
  },

  loadGoogleCharts() {
    // ...

    const callback = () => {
      Session.set('googleChartsLoaded', true);
    };
  }
};

Meteor.startup(() => App.run());

