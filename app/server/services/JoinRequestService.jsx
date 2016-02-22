import {Server} from './../server.jsx';
import {Games} from './../collections/Games.jsx';
import {JoinRequests, JoinRequest} from './../collections/JoinRequests.jsx';
import {Friends} from './../../common/collections/Friends.jsx';
import {BotService} from './BotService.jsx';
import {GameService} from './GameService.jsx';
import {GameRepository} from './../repositories/GameRepository.jsx';
import {JoinRequestRepository} from './../repositories/JoinRequestRepository.jsx';

export const JoinRequestService = {

    accept(requestId) {
        var request = JoinRequests.findOne(requestId);
        if (!request){
            throw Meteor.Error("404", "Request does not exist with id" + requestId);
        }

        const game = Games.findOne(request.gameId);

        try {
            Server.fetchGameBoard(request.from, game.getId(), 1);
            Server.fetchGameBoard(request.to,   game.getId(), 2);
        } catch (e) {}

        JoinRequests.remove(requestId);
        return Games.findOne(game.getId());
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
        var game = Games.findOne(request.gameId);
        game.setStatus(GameStatus.Declined);
        GameRepository.save(game);
        return {status: "success"};
    },

    getOpponent(currentUserId, friendId) {
        const friend = Friends.findOne(friendId);

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

        if (friend.userId == null) {
          const friendUser = UserRepository.byFacebookId(friend.facebookId);

          if (friendUser == null) {
            const msg = `Friend ${friendId} has no associated user.`;
            throw new Meteor.Error('JoinRequestService.noAssociatedUser', msg);
          }

          friend.userId = friendUser._id;
          FriendRepository.save(friend);
        }

        const currentUser = Meteor.users.findOne(currentUserId);
        const asFriend    = {
          id: currentUser.services.facebook.id,
          name: currentUser.services.facebook.name,
          isBot: false
        };

        FriendRepository.updateFriends(friend.userId, [asFriend]);

        return Meteor.users.findOne(friend.userId);
    },

    send(currentUserId, friendId) {
      try {
        const opponent  = JoinRequestService.getOpponent(currentUserId, friendId);
        const game      = GameService.createGame(currentUserId, opponent._id);
        const gameId    = GameRepository.save(game);
        const join      = JoinRequest.fromRaw({ from: currentUserId, to: opponent._id, gameId: gameId });
        const requestId = JoinRequestRepository.save(join);
        console.log(`Created join request ${requestId} from ${currentUserId} to ${opponent._id} for game ${gameId}`);

        return {
          status: 'success',
          requestId: requestId
        };
      }
      catch (e) {
        console.error(`JoinRequestService - Error: ${e}`);
        return {
          status: 'error',
          msg: e.reason
        };
      }
    }

};

