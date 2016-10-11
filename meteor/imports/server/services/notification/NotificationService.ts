
import { MeteorUser }             from '../../../common/collections/MeteorUser';
import { Events, EventTypes }     from '../../events';
import { EventBus }               from '../../events/EventBus';
import { BOT_USERNAME }           from '../BotService';
import { UserRepository }         from '../../repositories/UserRepository';

export abstract class NotificationService {

  public abstract sendTo(user: MeteorUser, message: string): void

  public mentionUser(user: MeteorUser): string {
    if (user == null) {
      return 'Someone';
    }

    // if (user.services != null && user.services.facebook != null && user.services.facebook.id != null) {
    //   return `@[${user.services.facebook.id}]`;
    // }

    if (user.profile != null && user.profile.name != null) {
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

    this.sendTo(request.getFrom(), `${this.mentionUser(to)} has accepted your join request.`);
  }

  public onJoinRequestDeclined(event: Events.JoinRequestDeclined): void {
    const request = event.getData();
    const to      = request.getTo();

    this.sendTo(request.getFrom(), `${this.mentionUser(to)} has declined your join request.`);
  }

  public onNewJoinRequest(event: Events.NewJoinRequest): void {
    const request = event.getData();
    const from    = request.getFrom();

    this.sendTo(request.getTo(), `${this.mentionUser(from)} has sent you a join request.`);
  }

  public onOpponentPlayed(event: Events.OpponentPlayed): void {
    const { opponent, currentPlayer, game } = event.getData();

    this.sendTo(currentPlayer, `${this.mentionUser(opponent)} just played a move.`);
  }

  public onGameEnded(event: Events.GameEnded): void {
    const game    = event.getData();
    const player1 = UserRepository.byId(game.player1);
    const player2 = UserRepository.byId(game.player2);

    if (game.isDraw()) {
      this.sendTo(player1, `Your game with ${this.mentionUser(player2)} has ended in a draw.`);
      this.sendTo(player2, `Your game with ${this.mentionUser(player1)} has ended in a draw.`);
    }
    else if (game.wonBy === 1) {
      this.sendTo(player1, `You have won against ${this.mentionUser(player2)}, congrats!`);
      this.sendTo(player2, `Sorry, you have lost against ${this.mentionUser(player1)}.`);
    }
    else {
      this.sendTo(player1, `Sorry, you have lost against ${this.mentionUser(player2)}.`);
      this.sendTo(player2, `You have won against ${this.mentionUser(player1)}, congrats!`);
    }
  }

}

