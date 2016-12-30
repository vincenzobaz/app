
import {GameFetches}             from './collections/GameFetches';
import {GameFetchRepository}     from './repositories/GameFetchRepository';
import {BotService}              from './services/BotService';
import {Games}                   from './collections/Games';
import {Game}                    from './collections/Game';
import {GameBoard, RawGameBoard} from '../common/models/GameBoard';
import {GameBoardRepository}     from './repositories/GameBoardRepository';
import {GameStatus, GAME_STATUS} from '../common/models/GameStatus';
import {GameFetch}               from './collections/GameFetch';
import {GameCreatorService}      from './services/GameCreatorService';
import {FacebookService}         from './services/FacebookService';
import {MeteorUser}              from '../common/collections/MeteorUser';
import {HTTPHelper} from "./helpers/http";
import {Reactioner} from "../common/models/Reactioner";
import {Reactioners, Blacklist} from "./collections/Reactioners";

export const Server = {

  fetchGameBoard(fbId: string, gameId: string | Mongo.ObjectID, playerNum: number, createFetch: boolean = true) {
    logger.info(`Fetching game board for user ${fbId}... and game ${gameId}`, {fbId: fbId});
    const game: Game = Games.findOne(gameId);
    const bot = BotService.bot();

    let gameBoard;

    if (!game) {
      return;
    }
    try {
      if (BotService.isBot(fbId)) {
        logger.info(`User ${fbId} is a bot. Creating bot board...`);
        const botBoard: RawGameBoard = JSON.parse(Assets.getText('json/gameboards/gameboard1.json'));
        botBoard.userId = fbId;
        gameBoard = GameBoard.fromRaw(botBoard);
      }
      else {
        const user: MeteorUser = FacebookService.getUserFromFacebookId(fbId);
        const accessToken = user.services.facebook.accessToken;
        const rawBoard: RawGameBoard = GameCreatorService.fetchGameboard(fbId, accessToken).data;
        rawBoard.userId = fbId;

        gameBoard = GameBoard.fromRaw(rawBoard);

      }

      GameBoardRepository.save(gameBoard);
      switch (playerNum) {
        case 1:
          game.player1Board = gameBoard;
          break;
        case 2:
          game.player2Board = gameBoard;
          break;
        default:
          throw new Meteor.Error(`Playern Number ${playerNum} is not authorized [1, 2] only`)
      }

      const status = (game.player1Board && game.player2Board) ? GAME_STATUS.Playing : GAME_STATUS.Creating;
      game.status = status;

      Games.update(game._id, game);

      return gameBoard;
    }
    catch (e) {
      logger.error(`Can't create game board from game creator result.`, {trace: e.stack});

      if (createFetch && !BotService.isBot(fbId)) {
        logger.debug(`Creating new fetch request as it failed for user ${fbId} in game: ${game._id}`, {fbId: fbId});
        const fetch = new GameFetch(
            new Mongo.ObjectID(),
            game._id,
            fbId,
            playerNum,
            1
        );

        GameFetchRepository.save(fetch);
      }
    }
  },

    /**
     * Prepares and sends get request for statistics to stats module
     * @param fbUserId Facebook User id of the player
     * @param from start date, optional
     * @param to end date, optional
     * @param callback, function to execute upon reception of response, optional
     */
  fetchStats(fbUserId: string, from?: Date, to?: Date, callback?: Function) {
      let url: string = process.env.STATS_URL + '/stats?userId=' + fbUserId;
      if (from || to) {
          url += '?';
      }
      if (from) {
          url += 'from=' + ddMMyyyy(from);
          if (to) {
              url += '&to=' + ddMMyyyy(to);
          }
      }
      if (to) {
          url += 'to=' + ddMMyyyy(to);
      }
      return HTTPHelper.get(url, callback);
  },

   /**
    * Requests reactioner list from gamecreator.
    * @param fbUserId Facebook User id of the player
    * @param callback function to execute upon reception of response.
    */
  fetchReactioners(fbUserId: string, callback?: Function) {
      let url: string = process.env.GAME_CREATOR_URL + '/reactions?user_id=' + fbUserId;
      return HTTPHelper.get(url, callback);
  },

   /**
    * Requests blacklist from gamecreator.
    * @param fbUserId Facebook User id of the player
    * @param callback function to execute upon reception of response.
    */
  fetchBlacklist(fbUserId: string, callback?: Function) {
      let url: string = process.env.GAME_CREATOR_URL + '/blacklist?user_id=' + fbUserId;
      return HTTPHelper.get(url, callback)
  },

  fetchData(fbId: string) {
    logger.debug(`Fetching data for user ${fbId}...`, {fbId: fbId});
    const user = FacebookService.getUserFromFacebookId(fbId);
    const accessToken = user.services.facebook.accessToken;

    try {
      const result = GameCreatorService.fetchData(fbId, accessToken);
      logger.info(`Game creator replied: ${result.data.message}`, {fbId: fbId});
    }
    catch (e) {
      logger.error(`Non 200 reply from game creator to 'fetchData' request ${e}`, {fbId: fbId});
    }
  },

  fetchAllBoards() {
    const fetches = GameFetches.find().fetch();
    fetches.forEach((fetch: GameFetch) => {
      Meteor.setTimeout(() => {
        logger.debug(`Trying again to fetch data for ${fetch.playerId} in game: ${fetch.gameId} for the: ${fetch.tries} time`);
        this.processFetch(fetch);
      }, 0);
    });
  },

  processFetch(fetch: GameFetch) {
    logger.debug('Processing fetch', {
      id_ : fetch._id,
      gameId: fetch.gameId,
      playerId: fetch.playerId,
      player: fetch.player,
      tries: fetch.tries}
      );

    const board = this.fetchGameBoard(fetch.playerId, fetch.gameId, fetch.player, false);

    if (board == null) {
      this.fetchFailed(fetch);
    } else {
      GameFetches.remove(fetch._id);

    }
  },

  fetchFailed(fetch: GameFetch) {
    fetch.incrementTries();

    if (fetch.tries >= 10) {
      const failedGame: Game = Games.findOne(fetch.gameId);
      if (failedGame) {
        failedGame.status = GAME_STATUS.Failed;
        Games.update(failedGame._id, failedGame);
        logger.error(`Server: Maximum number of tries for game ${failedGame._id} reached`);
      }
      GameFetches.remove(fetch._id);

    }
    else {
      GameFetchRepository.save(fetch);
    }
  },

    /**
     * Communicates to game creator the new blacklist for the user
     * @param fbUserId the user whose blacklist is updated
     * @param list the list of newly blacklisted players
     */
  pushBlacklist(fbUserId: string, list: Reactioner[]) {
      // List preparation
      const blacklist: Reactioner[] = Reactioners
          .find({thisId: fbUserId, blacklisted: true})
          .fetch();

      list.forEach(newEvil => blacklist.push(newEvil)); // new blacklisted are added to list
      blacklist.forEach(element => delete element.thisId); // game-creator does not this property

      let url: string = process.env.GAME_CREATOR_URL + '/blacklist?user_id=' + fbUserId;
      let headers: {[id: string] : string} = {
          'Content-Type' : 'application/json'
      };
      let req = {
          headers: headers,
          data: blacklist
      };

      return HTTPHelper.post(url, req, () => logger.debug("Updated blacklist sent to game creator", {userId: fbUserId}));
  },

    /**
     * Communicates to game creator that some users should be removed from blacklist
     * @param fbUserId the user whose blacklist is updated
     * @param list the list of forgiven players
     */
  removeFromBlacklist(fbUserId: string, list: Reactioner[]) {
      list.forEach(el => Blacklist.remove({thisId: fbUserId, userId: el.userId}));
      return this.pushBlacklist(fbUserId, []);
  }
};

/**
 * Converts a date object into a string compatible with the stats module API
 * @param date the date to convert
 * @returns {string} the in format ddMMyyyy
 */
function ddMMyyyy(date: Date): string {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}
