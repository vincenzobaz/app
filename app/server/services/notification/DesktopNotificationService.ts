
import { Notification }           from '../../../common/models/Notification';
import { Notifications }          from '../../../common/collections/Notifications';
import { MeteorUser }             from '../../../common/collections/MeteorUser';
import { NotificationRepository } from '../../repositories/NotificationRepository';
import { NotificationService }    from './NotificationService';
import { BOT_USERNAME }           from '../BotService';

export class DesktopNotificationService extends NotificationService {

  constructor(private debug: boolean = false) {
    super();
  }

  public mentionUser(user: MeteorUser): string {
    if (user && user.services && user.services.facebook != null) {
      return user.services.facebook.name;
    } else if (user && user.profile && user.profile.name) {
      return user.profile.name;
    }

    return BOT_USERNAME;
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

