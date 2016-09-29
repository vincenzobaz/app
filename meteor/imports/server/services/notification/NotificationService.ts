
import { MeteorUser }             from '../../../common/collections/MeteorUser';
import { Events, EventTypes }     from '../../events';
import { EventBus }               from '../../events/EventBus';
import { BOT_USERNAME }           from '../BotService';

export abstract class NotificationService {

  public abstract sendTo(userId: string | Mongo.ObjectID, message: string): void

  public mentionUser(user: MeteorUser): string {
    if (user == null) {
      return;
    }

    if (user.services != null && user.services.facebook != null && user.services.facebook.id != null) {
      return `@[${user.services.facebook.id}]`;
    }
    else if (user.profile != null && user.profile.name != null) {
      return user.profile.name;
    }

    return BOT_USERNAME;
  }

  public subscribeTo(eventBus: EventBus): void {
    eventBus.on(EventTypes.JoinRequestAccepted, this.onJoinRequestAccepted.bind(this));
    eventBus.on(EventTypes.JoinRequestDeclined, this.onJoinRequestDeclined.bind(this));
    eventBus.on(EventTypes.NewJoinRequest,      this.onNewJoinRequest.bind(this));
    eventBus.on(EventTypes.OpponentPlayed,      this.onOpponentPlayed.bind(this));
    eventBus.on(EventTypes.GameEnded,           this.onGameEnded.bind(this));
  }

  public onJoinRequestAccepted(event: Events.JoinRequestAccepted): void {
    const request = event.getData();
    const to      = request.getTo();

    this.sendTo(request.from, `${this.mentionUser(to)} has accepted your join request.`);
  }

  public onJoinRequestDeclined(event: Events.JoinRequestDeclined): void {
    const request = event.getData();
    const to      = request.getTo();

    this.sendTo(request.from, `${this.mentionUser(to)} has declined your join request.`);
  }

  public onNewJoinRequest(event: Events.NewJoinRequest): void {
    const request = event.getData();
    const from    = request.getFrom();

    this.sendTo(request.to, `${this.mentionUser(from)} has sent you a join request.`);
  }

  public onOpponentPlayed(event: Events.OpponentPlayed): void {
    const { opponent, game } = event.getData();
  }

  public onGameEnded(event: Events.GameEnded): void {
    const game = event.getData();

    if (game.isDraw()) {
      this.sendTo(game.player1, `Your game with ${game.player2} has ended in a draw.`);
      this.sendTo(game.player2, `Your game with ${game.player1} has ended in a draw.`);
    }
    else if (game.wonBy === 1) {
      this.sendTo(game.player1, `You have won against ${game.player2}, congrats!`);
      this.sendTo(game.player2, `Sorry, you have lost against ${game.player1}.`);
    }
    else {
      this.sendTo(game.player1, `Sorry, you have lost against ${game.player2}.`);
      this.sendTo(game.player2, `You have won against ${game.player1}, congrats!`);
    }
  }

}

