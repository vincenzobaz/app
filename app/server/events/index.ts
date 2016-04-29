
import { EventBus, EventType, Event } from './EventBus';

import JoinRequest from '../collections/JoinRequest';

const isDebug = process.env.NODE_ENV === 'development';

export const GlobalEventBus = new EventBus(isDebug);

export namespace EventTypes {
  export const NewJoinRequest      = new EventType<JoinRequest>('JoinRequests.new');
  export const JoinRequestAccepted = new EventType<JoinRequest>('JoinRequests.accepted');
  export const JoinRequestDeclined = new EventType<JoinRequest>('JoinRequests.declined');
  export const OpponentPlayed      = new EventType<{}>('Game.opponentPlayed');
  export const GameEnded           = new EventType<{}>('Game.ended');
};

export namespace Events {
  export class NewJoinRequest extends Event<JoinRequest> {
    constructor(data: JoinRequest) {
      super(EventTypes.NewJoinRequest, data);
    }
  }

  export class JoinRequestAccepted extends Event<JoinRequest> {
    constructor(data: JoinRequest) {
      super(EventTypes.JoinRequestAccepted, data);
    }
  }

  export class JoinRequestDeclined extends Event<JoinRequest> {
    constructor(data: JoinRequest) {
      super(EventTypes.JoinRequestDeclined, data);
    }
  }
};

