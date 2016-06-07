import * as React     from 'react';
import * as ReactDOM  from 'react-dom';

import {ErrorStore}        from './stores/ErrorStore';
import {ModalStore}        from './stores/ModalStore';
import {NotificationStore} from './stores/NotificationStore';
import {ErrorHandler}      from './components/ErrorHandler';
import {ModalHandler}      from './components/ModalHandler';
import {Main}              from './handlers/Main';
import {FacebookClientService} from "./services/FacebookClientService";
import {Feedback, FEEDBACK_STATUS} from "../common/models/Feedback";
import {StateCollector} from "./StateCollector";

const $$ = document.getElementById.bind(document);

class App {

  boot():void {
    ErrorStore.register();
    this.subscribe();
    $['feedback']({
      ajaxURL: 'http://test.url.com/feedback',
      html2canvasURL: 'js/html2canvas.js',
      onFeedbackSend: (feedback:Feedback, onSuccess:Function, onFailure:Function) => {
        console.log(feedback);
        feedback.userId = Meteor.userId();
        let {game, tile, question} = StateCollector.getState();
        feedback.game = game;
        feedback.tile = tile;
        feedback.question = question;
        feedback.creationDate = new Date();
        feedback.status = FEEDBACK_STATUS.New;
        Meteor.call('SendFeedback', feedback, (error:Meteor.Error, success) => {
          if (!error) {
            onSuccess();
          } else {
            onFailure();
          }

        })
      }
    });
    if (this.isLoggedIn()) {
      this.enableNotifications();
      this.loadFacebookSdk();
    }
  }

    render():void {
        ReactDOM.render(<ErrorHandler store={ErrorStore}/>, $$('error'));
        ReactDOM.render(<ModalHandler store={ModalStore}/>, $$('modal'));
        ReactDOM.render(<Main />, $$('app'));
    }

    isLoggedIn():boolean {
        return Meteor.userId() != null;
    }

    subscribe():void {
        console.log('Subscribing to Meteor channels...');

        Meteor.subscribe('games');
        Meteor.subscribe('gameBoards');
        Meteor.subscribe('joinRequests');
        Meteor.subscribe('userServices');
        Meteor.subscribe('friends');
        Meteor.subscribe('notifications');
        Meteor.subscribe('feedback');
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


}

const app = new App();

Meteor.startup(() => {
    app.boot();
    app.render();
});

