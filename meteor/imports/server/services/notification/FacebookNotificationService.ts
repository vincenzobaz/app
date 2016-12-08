
import { FBNotification }           from '../../../common/models/Notification';
import { FBNotifications }          from '../../../common/collections/Notifications';
import { MeteorUser }               from '../../../common/collections/MeteorUser';
import { FBNotificationRepository } from '../../repositories/NotificationRepository';
import { NotificationService }      from './NotificationService';
import { FacebookService }          from '../FacebookService';
import { Events, EventTypes }       from '../../events';
import { EventBus }                 from '../../events/EventBus';
import { BotService   }             from '../BotService';

export class FacebookNotificationService extends NotificationService {

  constructor() {
    super();
  }

  public sendTo(user: MeteorUser, message: string): void {
    if (user == null || BotService.isBot(user._id)) {
      return;
    }

    if (user.services == null || user.services.facebook == null || user.services.facebook.id == null) {
      logger.error(`[FacebookNotificationService] Given user ${user} has no Facebook ID.`);

      return;
    }

    const fbId = user.services.facebook.id;

    logger.debug(`[FacebookNotificationService] delivered notification.`, {
      to: fbId,
      message: message
    });

    const notif = FBNotification.fromRaw({
      userId: user._id,
      fbId: fbId,
      message: message,
      dateCreated: new Date(),
      sent: false
    });

    this.saveNotif(notif);
  }

  public saveNotif(notif: FBNotification): void {
    logger.debug(`[FacebookNotificationService] notification saved`, {
      notif: notif
    });

    FBNotificationRepository.save(notif);
  }

  public static send() {
    logger.info('Checking if there are notifications to send...');

    ServiceConfiguration.configurations.upsert(
        { service: 'fbNotifs' },
        {
            $set: {
              lastSent: new Date()
            }
        }
    );

    const notifsByFbId = FBNotificationRepository.findUnsent();

    Object.keys(notifsByFbId).forEach(fbId => {
      const notifs = notifsByFbId[fbId];

      if (notifs.length <= 0) {
        return;
      }

      const notif = notifs[0];

      if (notifs.length === 1) {
        FacebookNotificationService.sendNotif(notif);
      }
      else {
        const genericNotif = FBNotification.fromRaw({
          userId: null,
          fbId: fbId,
          message: 'Things happened on reminisce.me, go take a look!',
          dateCreated: new Date(),
          sent: false
        });

        FacebookNotificationService.sendNotif(genericNotif);
      }

      FBNotificationRepository.markAsSent(notifs.map(n => n._id));
    });
  }

  private static sendNotif(notif: FBNotification): void {
    FacebookService.postNotification(notif.fbId, notif.message);
  }

}

