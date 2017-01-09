
import { Notifications } from '../../common/collections/Notifications';
import { Notification }  from '../../common/models/Notification';

const Notify     = require('notifyjs');
const Alertify   = require('alertify.js');
const Visibility = require('visibility')();

// necessary for the TypeScript compiler
declare var cordova: any;

export const NotificationStore = {

  desktopSupported: false,

  requestPermissionIfNeeded(): void {
    try {
      this.desktopSupported = Notify.isSupported();
    } catch (e) {
      this.desktopSupported = true;
    }

    if (!this.desktopSupported) {
      return;
    }

    if (Notify.needsPermission) {
      Notify.requestPermission(
        this.onPermissionGranted.bind(this),
        this.onPermissionDenied.bind(this)
      );
    }
  },

  list(): Notification[] {
    return Notifications.find({
      shown: false
    }).fetch();
  },

  fetchAndShow(): void {
    const notifs = this.list();

    if (notifs.length > 0) {
      this.showAll(notifs);
    }
  },

  showAll(notes: Notification[]): void {
    notes.forEach(this.showNotif.bind(this));

    const ids = notes.map(note => note._id);
    Meteor.call('Notifications.markAsShown', ids);
  },

  showNotif(note: Notification): void {
    if (Meteor.isCordova) {
      this.showMobileNotification(note);
    }
    else if (!this.desktopSupported || Visibility.visible()) {
      this.showInPageNotif(note);
    }
    else {
      this.showDesktopNotif(note);
    }
  },

  showMobileNotification(note: Notification): void {
    Meteor.startup( function () {
      cordova.plugins.notification.local.schedule({
        id: 1,
        text: note.message,
        icon: 'res://notifIcon',
        smallIcon: 'res://notifIcon',
        badge: 1
      });
    });
  },

  showInPageNotif(note: Notification): void {
    Alertify
      .maxLogItems(5)
      .delay(30 * 1000) // milliseconds
      .closeLogOnClick(true)
      .logPosition('top left')
      .log(note.message);
  },

  showDesktopNotif(note: Notification): void {
    const notif = new Notify(note.message, {
      timeout: 10, // seconds
      closeOnClick: true,
      icon: '/images/h/apple-touch-icon-ipad.png'
    });

    notif.show();
  },

  onPermissionGranted(): void {
    // console.log('Granted');
  },

  onPermissionDenied(): void {
    // console.log('Denied');
  },

};

