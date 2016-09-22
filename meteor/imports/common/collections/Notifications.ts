
import { Notification } from '../models/Notification';

export const Notifications = new Mongo.Collection<Notification>('notifications', {
  transform(doc) {
    return Notification.fromRaw(doc);
  }
});

