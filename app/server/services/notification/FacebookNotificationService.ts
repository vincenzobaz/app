
import { Notification }           from '../../../common/models/Notification';
import { Notifications }          from '../../../common/collections/Notifications';
import { NotificationRepository } from '../../repositories/NotificationRepository';
import { NotificationService }    from './NotificationService';
import { FacebookService }        from '../FacebookService';

import { MeteorUser }             from '../../MeteorUser';

export class FacebookNotificationService extends NotificationService {

  constructor(private debug: boolean = false) {
    super();
  }

  public mentionUser(user: MeteorUser): string {
    if (user.services.facebook != null) {
      return `@[user.services.facebook.id]`;
    }

    return user.profile.name;
  }

  public sendTo(userId: string | Mongo.ObjectID, message: string): void {
    const toUser      = <MeteorUser>Meteor.users.findOne(userId);
    const toUserFbId  = toUser.services.facebook.id;

    FacebookService.postNotification(toUserFbId, message);
  }

}

