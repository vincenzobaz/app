
import * as React     from 'react';
import * as ReactDOM  from 'react-dom';

import {ErrorStore}   from './stores/ErrorStore';
import {ErrorHandler} from './components/ErrorHandler';
import {ModalHandler} from './components/ModalHandler';
import {ModalStore}   from './stores/ModalStore';
import {Main}         from './handlers/Main';

const $$ = document.getElementById.bind(document);

class App {

  run() {
    ErrorStore.register();
    this.subscribe();

    ReactDOM.render(<ErrorHandler store={ErrorStore} />, $$('error'));
    ReactDOM.render(<ModalHandler store={ModalStore} />, $$('modal'));
    ReactDOM.render(<Main />, $$('app'));
  }

  subscribe() {
    console.log('Subscribing to Meteor channels...');

    Meteor.subscribe('games');
    Meteor.subscribe('gameBoards');
    Meteor.subscribe('joinRequests');
    Meteor.subscribe('userServices');
    Meteor.subscribe('friends');
  }

};

const app = new App();

Meteor.startup(() => app.run());

