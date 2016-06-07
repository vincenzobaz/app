
import { Notification }           from '../../../common/models/Notification';
import { Notifications }          from '../../../common/collections/Notifications';
import { NotificationRepository } from '../../repositories/NotificationRepository';
import { NotificationService }    from './NotificationService';
import { FacebookService }        from '../FacebookService';
import { Events, EventTypes }     from '../../events';
import { EventBus }               from '../../events/EventBus';
import { MeteorUser }             from '../../MeteorUser';
import {BOT_USERNAME} from "../BotService";

export class FacebookNotificationService extends NotificationService {

  constructor(private debug: boolean = false) {
    super();
  }

  public subscribeTo(eventBus: EventBus): void {
    eventBus.on(EventTypes.JoinRequestAccepted, this.onJoinRequestAccepted.bind(this));
    eventBus.on(EventTypes.JoinRequestDeclined, this.onJoinRequestDeclined.bind(this));
    eventBus.on(EventTypes.OpponentPlayed,      this.onOpponentPlayed.bind(this));
    eventBus.on(EventTypes.GameEnded,           this.onGameEnded.bind(this));
  }

  public mentionUser(user: MeteorUser): string {
    if (user && user.services && user.services.facebook != null) {
      return `@[${user.services.facebook.id}]`;
    }else if (user && user.profile && user.profile.name) {
      return user.profile.name;
    }

    return BOT_USERNAME;
  }

  public sendTo(fbId: string , message: string): void {
    FacebookService.postNotification(fbId, message);
  }

}

