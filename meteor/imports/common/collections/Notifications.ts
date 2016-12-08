
import { Notification, FBNotification } from '../models/Notification';

export const Notifications = new Mongo.Collection<Notification>('notifications', {
  transform(doc) {
    return Notification.fromRaw(doc);
  }
});

export const FBNotifications = new Mongo.Collection<FBNotification>('fbNotifications', {
  transform(doc) {
    return FBNotification.fromRaw(doc);
  }
});

