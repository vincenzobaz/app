
import { EventBus, EventType, Event } from './events/EventBus';

import JoinRequest from './collections/JoinRequest';
import { Game }    from './collections/Game';

const isDebug = process.env.NODE_ENV === 'development';

export const GlobalEventBus = new EventBus(isDebug);

interface OpponentPlayedData {
  opponent: Meteor.User;
  currentPlayer: Meteor.User;
  game: Game;
}

export namespace EventTypes {
  export const NewJoinRequest      = new EventType<JoinRequest>('JoinRequests.new');
  export const JoinRequestAccepted = new EventType<JoinRequest>('JoinRequests.accepted');
  export const JoinRequestDeclined = new EventType<JoinRequest>('JoinRequests.declined');
  export const OpponentPlayed      = new EventType<OpponentPlayedData>('Game.opponentPlayed');
  export const GameEnded           = new EventType<Game>('Game.ended');
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

  export class OpponentPlayed extends Event<OpponentPlayedData> {
    constructor(data: OpponentPlayedData) {
      super(EventTypes.OpponentPlayed, data);
    }
  }

  export class GameEnded extends Event<Game> {
    constructor(data: Game) {
      super(EventTypes.GameEnded, data);
    }
  }

};

