
import { Notification }           from '../../../common/models/Notification';
import { Notifications }          from '../../../common/collections/Notifications';
import { NotificationRepository } from '../../repositories/NotificationRepository';
import { NotificationService }    from './NotificationService';

import { MeteorUser }             from '../../MeteorUser';

export class DesktopNotificationService extends NotificationService {

  constructor(private debug: boolean = false) {
    super();
  }

  public mentionUser(user: MeteorUser): string {
    if (user.services.facebook != null) {
      return user.services.facebook.name;
    }

    return user.profile.name;
  }

  public sendTo(userId: string | Mongo.ObjectID, message: string): void {
    this.send(this.create(userId, message));
  }

  public send(notif: Notification): void {
    if (this.debug) {
      console.log(`[NotificationService] send: to=${notif.userId} message="${notif.message}"`);
    }

    NotificationRepository.save(notif);
  }

  public create(userId: string | Mongo.ObjectID, message: string): Notification {
    return new Notification(null, `${userId}`, message);
  }

}

