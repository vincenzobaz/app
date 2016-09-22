import {Server}                       from '../server';
import {BotService}                   from './BotService';
import {GameService}                  from './GameService';

import {Friends}                      from '../../common/collections/Friends';
import {MeteorUser}                   from "../../common/collections/MeteorUser";
import {GameStatus, GAME_STATUS}      from "../../common/models/GameStatus";
import {Friend}                       from "../../common/models/Friend";

import {Game}                         from "../collections/Game";
import {Games}                        from '../collections/Games';
import {JoinRequests}                 from "../collections/JoinRequests";
import JoinRequest, {RawJoinRequest} from "../collections/JoinRequest";

import {JoinRequestRepository}        from '../repositories/JoinRequestRepository';
import {FriendRepository}             from "../repositories/FriendRepository";
import {UserRepository}              from "../repositories/UserRepository";

import {GlobalEventBus, Events}       from '../events';

import User = Meteor.User;

export const JoinRequestService = {

  accept(requestId) {
    var request = JoinRequests.findOne(requestId);
    if (!request) {
      throw new Meteor.Error("404", "Request does not exist with id" + requestId);
    }
    const game: Game = Games.findOne(request.gameId);

    // if (BotService.isBot(game.player1) || BotService.isBot(game.player2)) {
    //   BotService.observeGame(game._id, BotService.bot()._id);
    // }
    GameService.fetchBoards(game);

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

  send(fromFbId: string, toFbId: string, requestId: string): {status: string, request: JoinRequest, msg: string } {
    try {
      let joinRequest: JoinRequest = JoinRequests.findOne({from: fromFbId, to: toFbId});
      if (joinRequest) {
        JoinRequests.update({_id: joinRequest._id}, {$push: {requestIds: requestId}})
      } else {
        const game = GameService.createGame(fromFbId, toFbId);
        const gameId = Games.insert(game);
        joinRequest = new JoinRequest(new Mongo.ObjectID(), fromFbId, toFbId, gameId, [requestId]);
        JoinRequests.insert(joinRequest);
      }

      JoinRequestRepository.save(joinRequest);

      const event = new Events.NewJoinRequest(joinRequest);
      GlobalEventBus.emit(event);

      return {
        status: 'success',
        request: joinRequest,
        msg: "Success"
      };
    }
    catch (e) {
      console.error(`JoinRequestService - Error: ${e}`);
      return {
        status: 'error',
        request: null,
        msg: e.reason
      };
    }
  }

};

