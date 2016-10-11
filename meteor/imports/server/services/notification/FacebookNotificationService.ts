
import { Notification }           from '../../../common/models/Notification';
import { Notifications }          from '../../../common/collections/Notifications';
import { MeteorUser }             from '../../../common/collections/MeteorUser';
import { NotificationRepository } from '../../repositories/NotificationRepository';
import { NotificationService }    from './NotificationService';
import { FacebookService }        from '../FacebookService';
import { Events, EventTypes }     from '../../events';
import { EventBus }               from '../../events/EventBus';
import { BotService   }           from '../BotService';

export class FacebookNotificationService extends NotificationService {

  constructor(private debug: boolean = false) {
    super();
  }

  public sendTo(user: MeteorUser, message: string): void {
    if (user == null || BotService.isBot(user._id)) {
      return;
    }

    if (user.services == null || user.services.facebook == null || user.services.facebook.id == null) {
      if (this.debug) {
        console.error(`[FacebookNotificationService] Given user ${user} has no Facebook ID.`);
      }

      return;
    }

    const fbId = user.services.facebook.id;

    if (this.debug) {
      console.log(`[FacebookNotificationService] send: to=${fbId} message="${message}"`);
    }

    FacebookService.postNotification(fbId, message);
  }

}

