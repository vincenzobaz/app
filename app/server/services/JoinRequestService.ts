import { Server }                       from '../server';
import { BotService }                   from './BotService';
import { GameService }                  from './GameService';

import { Friends }                      from '../../common/collections/Friends';
import { GameStatus, GAME_STATUS }      from "../../common/models/GameStatus";
import { Friend }                       from "../../common/models/Friend";

import { Game }                         from "../collections/Game";
import { Games }                        from '../collections/Games';
import { JoinRequests }                 from "../collections/JoinRequests";
import JoinRequest, { RawJoinRequest  } from "../collections/JoinRequest";

import { JoinRequestRepository }        from '../repositories/JoinRequestRepository';
import { FriendRepository }             from "../repositories/FriendRepository";
import { UserRepository  }              from "../repositories/UserRepository";

import { GlobalEventBus, Events }       from '../events';

import { MeteorUser  }                  from "../MeteorUser";

import User                             = Meteor.User;

export const JoinRequestService = {

    accept(requestId) {
        var request = JoinRequests.findOne(requestId);
        if (!request){
            throw new Meteor.Error("404", "Request does not exist with id" + requestId);
        }

        const game: Game = Games.findOne(request.gameId);

        try {
            Server.fetchGameBoard(request.from, game._id, 1);
            Server.fetchGameBoard(request.to,   game._id, 2);
        } catch (e) {}

        JoinRequests.remove(requestId);

        const event = new Events.JoinRequestAccepted(request);
        GlobalEventBus.emit(event);

        return Games.findOne(game._id);
    },

    decline(requestId) {
        const request = JoinRequests.findOne(requestId);

        if (request == null) {
          const msg = `No request with id ${requestId} found.`;
          console.error(msg);
          return {
            status: 'error',
            msg: msg
          };
        }

        JoinRequests.remove(requestId);
        var game: Game = Games.findOne(request.gameId);
        game.status = GAME_STATUS.Declined;
        Games.update(game._id, game);

        const event = new Events.JoinRequestDeclined(request);
        GlobalEventBus.emit(event);

        return {status: "success", msg: "Success"};
    },

    getOpponent(currentUserId, friendId): User {
        const friend: Friend = Friends.findOne(friendId);

        if (friend == null) {
            const msg = `Couldn't find a friend with id ${friendId}.`;
            throw new Meteor.Error('JoinRequestService.noFriendWithId', msg);
        }

        if (friend.isBot) {
            return BotService.getBot();
        }

        if (friend.facebookId == null) {
          const msg = `Friend with id ${friendId} has no associated Facebook id.`;
          throw new Meteor.Error('JoinRequestService.noAssociatedFacebook', msg);
        }

        console.log(`Checking if user ${currentUserId} is friend with ${friend.userId}`);
      

        return Meteor.users.findOne(friend.userId);
    },

    send(currentUserId: string, friendId): {status: string, requestId: JoinRequest, msg: string } {
      try {
        const opponent: MeteorUser = this.getOpponent(currentUserId, friendId);

        const game        = GameService.createGame(currentUserId, opponent._id);
        const gameId      = Games.insert(game);
        const joinRequest = JoinRequest.fromRaw({
          _id: new Mongo.ObjectID(),
          from: currentUserId,
          to: opponent._id,
          gameId: gameId
        });

        const requestId = JoinRequestRepository.save(joinRequest);

        console.log(`Created join request ${requestId} from ${currentUserId} to ${opponent._id} for game ${gameId}`);

        const event = new Events.NewJoinRequest(joinRequest);
        GlobalEventBus.emit(event);

        return {
          status: 'success',
          requestId: requestId,
          msg: "Success"
        };
      }
      catch (e) {
        console.error(`JoinRequestService - Error: ${e}`);
        return {
          status: 'error',
          requestId: null,
          msg: e.reason
        };
      }
    }

};

