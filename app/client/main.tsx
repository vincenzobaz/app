
import * as React     from 'react';
import * as ReactDOM  from 'react-dom';

import {ErrorStore}        from './stores/ErrorStore';
import {ModalStore}        from './stores/ModalStore';
import {NotificationStore} from './stores/NotificationStore';
import {ErrorHandler}      from './components/ErrorHandler';
import {ModalHandler}      from './components/ModalHandler';
import {Main}              from './handlers/Main';

const $$ = document.getElementById.bind(document);

class App {

  boot() {
    ErrorStore.register();

    this.subscribe();
  }

  render() {
    ReactDOM.render(<ErrorHandler store={ErrorStore} />, $$('error'));
    ReactDOM.render(<ModalHandler store={ModalStore} />, $$('modal'));
    ReactDOM.render(<Main />, $$('app'));
  }

  private subscribe(): void {
    console.log('Subscribing to Meteor channels...');

    Meteor.subscribe('games');
    Meteor.subscribe('gameBoards');
    Meteor.subscribe('joinRequests');
    Meteor.subscribe('userServices');
    Meteor.subscribe('friends');
    Meteor.subscribe('notifications');
  }

};


Meteor.startup(() => {
  const app = new App();
  app.boot();
  app.render();
});

Accounts.onLogin(() => {
  NotificationStore.requestPermissionIfNeeded();

  Tracker.autorun(() => {
    NotificationStore.fetchAndShow();
  });
});

