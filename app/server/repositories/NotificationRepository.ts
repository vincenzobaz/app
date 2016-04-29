
import { GenericRepository } from './GenericRepository';

import { Notifications } from '../../common/collections/Notifications';
import { Notification }  from '../../common/models/Notification';

export const NotificationRepository =
  new GenericRepository<Notification>(Notifications);

