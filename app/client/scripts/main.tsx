


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ErrorStore} from './stores/ErrorStore';
import {ErrorHandler} from './components/ErrorHandler';
import {ModalHandler} from './components/ModalHandler';
import {ModalManager} from './ModalManager';
import {Main} from "./handlers/Main";


var $$ = document.getElementById.bind(document);

var App = {
  run() {
    // console.log("We have timer", QuestionTimer);
    ErrorStore.register();

    this.subscribe();
    this.loadGoogleCharts();
    ReactDOM.render(<ErrorHandler store={ErrorStore} />, $$('error'));
    ReactDOM.render(<Main />, $$('app'));
    ReactDOM.render(<ModalHandler manager={ModalManager} />, $$('modal'));
  },

  subscribe() {
    console.log('Subscribing to Meteor channels...');

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

