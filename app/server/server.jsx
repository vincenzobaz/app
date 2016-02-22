import {GameFetches} from "./collections/GameFetches.jsx";
import {GameCreatorService} from "./services/GameCreatorService.jsx";
import {GameRepository} from './repositories/GameRepository.jsx';
import {GameFetchRepository} from './repositories/GameFetchRepository.jsx';
import {BotService} from './services/BotService.jsx';
import {Games} from './collections/Games.jsx';
import {GameBoard} from './../common/models/GameBoard.jsx';
import {GameBoardRepository} from './repositories/GameBoardRepository.jsx';
import {GameStatus} from './../common/models/GameStatus.jsx';

export const Server = {

  fetchGameBoard(userId, gameId, playerNum, createFetch = true) {
    console.log(`Fetching game board for user ${userId}...`);

    const game = Games.findOne(gameId);
    const bot = BotService.bot();

    let gameBoard;

    try {
      if (BotService.isBot(userId)) {
        console.log(`User ${userId} is a bot. Creating bot board...`);
        const botBoard = JSON.parse(Assets.getText('json/gameboards/gameboard1.json'));
        gameBoard = GameBoard.fromRaw(userId, botBoard);
      }
      else {
        const user        = Meteor.users.findOne(userId);
        const fbUserId    = user.services.facebook.id;
        const accessToken = user.services.facebook.accessToken;
        const result = GameCreatorService.fetchGameboard(fbUserId, accessToken);

        gameBoard = GameBoard.fromRaw(userId, result.data);

        console.log(`Fetched game board for user ${userId}`);
      }

      console.log(`Saving board for player ${playerNum}`);
      GameBoardRepository.save(gameBoard);
      game[`setPlayer${playerNum}Board`](gameBoard);

      const status = (game.player1Board && game.player2Board) ? GameStatus.Playing : GameStatus.Creating;
      console.log(status);
      game.setStatus(status);

      GameRepository.save(game);

      return gameBoard;
    }
    catch (e) {
      console.error(`ERROR: Can't create game board from game creator result: ${e}`);

      if (createFetch) {
        const fetch = new GameFetch({
          gameId: game.getId(),
          player: playerNum,
          playerId: game[`getPlayer${playerNum}`](),
          tries: 1
        });

        GameFetchRepository.save(fetch);
      }
    }
  },

  fetchData(userId) {
    console.log(`Fetching data for user ${userId}...`);

    const user        = Meteor.users.findOne(userId);
    const fbUserId    = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;
    
    try {
      console.log("we try to fetch data from gamecreator");
      GameCreatorService.fetchData(fbUserId, accessToken);
    }
    catch (e) {
      console.log(`INFO: Non 200 reply from Game creator to 'fetchData' request ${e}`);
    }
  },

  fetchAllBoards() {
    const fetches = GameFetches.find().fetch();

    fetches.forEach(fetch => {
      Meteor.setTimeout(() => {
        this.processFetch(fetch);
      } , 0);
    });
  },

  processFetch(fetch) {
    console.log(`Processing fetch ${fetch.getId()}...`);
    console.log(` - Game: ${fetch.getGameId()}`);
    console.log(` - Player Id: ${fetch.getPlayerId()}`);
    console.log(` - Player Num: ${fetch.getPlayer()}`);
    console.log(` - Tries: ${fetch.getTries()}`);

    try {
      const board = this.fetchGameBoard(fetch.getPlayerId(), fetch.getGameId(), fetch.getPlayer(), false);

      if (board == null) {
        throw new Exception("Fetch failed");
      }

      GameFetches.remove(fetch.getId());
    }
    catch(e) {
      this.fetchFailed(fetch);
    }
  },

  fetchFailed(fetch) {
    fetch.incrementTries();

    if (fetch.getTries() >= 10) {
      const failedGame = Games.findOne(fetch.getGameId());
      failedGame.setStatus(GameStatus.Failed);
      GameRepository.save(failedGame);

      GameFetches.remove(fetch.getId());

      console.log(`Server: Maximum number of tries for game ${failedGame.getId()} reached`);
    }
    else {
      GameFetchRepository.save(fetch);
    }
  }

};


