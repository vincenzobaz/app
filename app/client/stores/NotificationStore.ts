
import { Notifications } from '../../common/collections/Notifications';
import { Notification }  from '../../common/models/Notification';

const Notify     = require('notifyjs');
const Alertify   = require('alertify.js');
const Visibility = require('visibility')();

export const NotificationStore = {

  requestPermissionIfNeeded(): void {
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
    if (Visibility.visible()) {
      this.showInPageNotif(note);
    }
    else {
      this.showDesktopNotif(note);
    }
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

