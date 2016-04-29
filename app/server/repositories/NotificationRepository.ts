
import { GenericRepository } from './GenericRepository';

import { Notifications } from '../../common/collections/Notifications';
import { Notification }  from '../../common/models/Notification';

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

}

export const NotificationRepository = new _NotificationRepository();

