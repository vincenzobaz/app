
import { Notification }           from '../../../common/models/Notification';
import { Notifications }          from '../../../common/collections/Notifications';
import { MeteorUser }             from '../../../common/collections/MeteorUser';
import { NotificationRepository } from '../../repositories/NotificationRepository';
import { NotificationService }    from './NotificationService';
import { FacebookService }        from '../FacebookService';
import { Events, EventTypes }     from '../../events';
import { EventBus }               from '../../events/EventBus';

export class FacebookNotificationService extends NotificationService {

  constructor(private debug: boolean = false) {
    super();
  }

  public sendTo(fbId: string , message: string): void {
    FacebookService.postNotification(fbId, message);
  }

}

