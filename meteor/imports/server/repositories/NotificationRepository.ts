
import { groupBy } from 'lodash';

import { GenericRepository } from './GenericRepository';

import { Notifications, FBNotifications } from '../../common/collections/Notifications';
import { Notification, FBNotification }   from '../../common/models/Notification';

class _NotificationRepository extends GenericRepository<Notification> {

  constructor() {
    super(Notifications);
  }

  public markAsShown(userId: Mongo.ObjectID | string, ids: Mongo.ObjectID[] | string[]): void {
    Notifications.update(
      { _id: { $in: ids }, userId: userId },
      { $set: { shown: true } },
      { multi: true }
    );
  }

  public removeNotificationsOf(userId: Mongo.ObjectID | string): void {
      Notifications.remove({userId: userId});
  }

}

export const NotificationRepository = new _NotificationRepository();

class _FBNotificationRepository extends GenericRepository<FBNotification> {

  constructor() {
    super(FBNotifications);
  }

  public findUnsent(): { [fbId: string]: FBNotification[] } {
    const notifs = FBNotifications.find({ sent: false }).fetch();

    return groupBy(notifs, notif => notif.fbId);
  }

  public markAsSent(ids: Mongo.ObjectID[] | string[]): void {
    FBNotifications.update(
      { _id: { $in: ids } },
      { $set: { sent: true } },
      { multi: true }
    );
  }

  public removeNotificationsOf(userId: Mongo.ObjectID | string): void {
      FBNotifications.remove({ userId: userId });
  }

}

export const FBNotificationRepository = new _FBNotificationRepository();
