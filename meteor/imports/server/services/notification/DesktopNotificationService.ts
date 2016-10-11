
import { Notification }             from '../../../common/models/Notification';
import { Notifications }            from '../../../common/collections/Notifications';
import { MeteorUser }               from '../../../common/collections/MeteorUser';
import { NotificationRepository }   from '../../repositories/NotificationRepository';
import { NotificationService }      from './NotificationService';
import { BotService, BOT_USERNAME } from '../BotService';

export class DesktopNotificationService extends NotificationService {

  constructor(private debug: boolean = false) {
    super();
  }

  public sendTo(user: MeteorUser, message: string): void {
    if (user == null || BotService.isBot(user._id)) {
      return;
    }

    this.saveNotif(this.createNotif(user._id, message));
  }

  public saveNotif(notif: Notification): void {
    if (this.debug) {
      console.log(`[DesktopNotificationService] send: to=${notif.userId} message="${notif.message}"`);
    }

    NotificationRepository.save(notif);
  }

  public createNotif(userId: string, message: string): Notification {
    return new Notification(null, userId.valueOf(), message);
  }

}

