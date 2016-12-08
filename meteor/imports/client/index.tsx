
import * as React     from 'react';
import * as ReactDOM  from 'react-dom';

import {ErrorStore}                from './stores/ErrorStore';
import {ModalStore}                from './stores/ModalStore';
import {NotificationStore}         from './stores/NotificationStore';
import {ErrorHandler}              from './components/ErrorHandler';
import {ModalHandler}              from './components/ModalHandler';
import {Main}                      from './pages/Main';
import {FacebookClientService}     from './services/FacebookClientService';
import {StateCollector}            from './StateCollector';
import {Feedback, FEEDBACK_STATUS} from '../common/models/Feedback';

import './vendor/feedback.js';

export class App {

  boot(): void {
    this.subscribe();

    if (this.isLoggedIn()) {
      this.enableNotifications();
      this.loadFacebookSdk();
      this.enableFeedback();
    }
  }

  render(): void {
      const errorStore = new ErrorStore();

      ReactDOM.render(<ErrorHandler store={errorStore}/>, document.getElementById('error'));
      ReactDOM.render(<ModalHandler store={ModalStore}/>, document.getElementById('modal'));
      ReactDOM.render(<Main />, document.getElementById('app'));

      errorStore.register();
  }

  isLoggedIn(): boolean {
      return Meteor.userId() != null;
  }

  subscribe(): void {
      console.log('Subscribing to Meteor channels...');

      Meteor.subscribe('games');
      Meteor.subscribe('gameBoards');
      Meteor.subscribe('joinRequests');
      Meteor.subscribe('userServices');
      Meteor.subscribe('friends');
      Meteor.subscribe('notifications');
      Meteor.subscribe('feedback');
      Meteor.subscribe('statistics');
  }

  enableNotifications():void {
      NotificationStore.requestPermissionIfNeeded();

      Tracker.autorun(() => {
          NotificationStore.fetchAndShow();
      });
  }

  loadFacebookSdk(count: number = 0): void {
    const fbConfig = ServiceConfiguration.configurations.findOne({
      service: 'facebook'
    });

    if (fbConfig == null) {
      console.log('FB service not available. Re-trying.');
      if (count < 10) {
        window.setTimeout(() => this.loadFacebookSdk(count + 1), 500);
      }

      return;
    }

    console.log('FB available.');

    const { appId } = fbConfig;

    window.fbAsyncInit = () => {
      FB.init({
        appId      : appId,
        xfbml      : false,
        version    : 'v2.6'
      });
    };

    (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  enableFeedback() {
    $['feedback']({
      ajaxURL: 'http://test.url.com/feedback',
      html2canvasURL: 'https://cdn.rawgit.com/ivoviz/feedback/14bd1fe/development/html2canvas.min.js',
      onFeedbackSend: (feedback: Feedback, onSuccess: Function, onFailure: Function) => {
        const { game, tile, question } = StateCollector.getState();

        feedback.userId            = Meteor.userId();
        feedback.game              = game;
        feedback.tile              = tile;
        feedback.question          = question;
        feedback.creationDate      = new Date();
        feedback.status            = FEEDBACK_STATUS.New;

        Meteor.call('SendFeedback', feedback, (error, success) => {
          if (!error) {
            onSuccess();
          } else {
            onFailure();
          }
        });
      }
    });
  }

}

