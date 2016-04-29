
import { Notification }           from '../../common/models/Notification';
import { Notifications }          from '../../common/collections/Notifications';
import { NotificationRepository } from '../repositories/NotificationRepository';

import { Events, EventTypes } from '../events';
import { EventBus }           from '../events/EventBus';

const isDebug = process.env.NODE_ENV === 'development';

export class NotificationService {

  private debug: boolean = false;

  constructor(debug: boolean = isDebug) {
    this.debug = debug;
  }

  public subscribeTo(eventBus: EventBus): void {
    eventBus.on(EventTypes.JoinRequestAccepted, this.onJoinRequestAccepted.bind(this));
    eventBus.on(EventTypes.JoinRequestDeclined, this.onJoinRequestDeclined.bind(this));
    eventBus.on(EventTypes.NewJoinRequest,      this.onNewJoinRequest.bind(this));
  }

  public onJoinRequestAccepted(event: Events.JoinRequestAccepted): void {
    const request = event.getData();
    const to      = request.getTo().services.facebook;
    const name    = (to != null) ? to.name : 'Someone';

    this.sendTo(request.from, `${name} has accepted your join request.`);
  }

  public onJoinRequestDeclined(event: Events.JoinRequestDeclined): void {
    const request = event.getData();
    const to      = request.getTo().services.facebook;
    const name    = (to != null) ? to.name : 'Someone';

    this.sendTo(request.from, `${name} has declined your join request.`);
  }

  public onNewJoinRequest(event: Events.NewJoinRequest): void {
    const request = event.getData();
    const from    = request.getFrom().services.facebook;
    const name    = (from != null) ? from.name : 'Someone';

    this.sendTo(request.to, `${name} has sent you a join request.`);
  }

  public create(userId: string | Mongo.ObjectID, message: string): Notification {
    return new Notification(null, `${userId}`, message);
  }

  public send(notif: Notification): void {
    if (this.debug) {
      console.log(`[NotificationService] send: to=${notif.userId} message="${notif.message}"`);
    }

    NotificationRepository.save(notif);
  }

  public sendTo(userId: string | Mongo.ObjectID, message: string): void {
    this.send(this.create(userId, message));
  }

}

