
class Server {

  fetchGameBoard(userId) {
    console.log(`Fetching game board for user ${userId}...`);

    const [bot1, bot2] = BotService.bots();

    if (BotService.isBot(userId)) {
      console.log(`User ${userId} is a bot. Creating bot board...`);

      const botBoard = JSON.parse(Assets.getText('json/gameboards/gameboard1.json'));

      return GameBoard.fromRaw(userId, botBoard);
    }

    const user        = Meteor.users.findOne(userId);
    const fbUserId    = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;

    const result = GameCreatorService.fetchGameboard(fbUserId, accessToken);

    try {
      const gameBoard = GameBoard.fromRaw(userId, result.data);
      console.log(`Fetched game board for user ${userId}`);
      return gameBoard;
    }
    catch (e) {
      console.error(`ERROR: Can't create game board from game creator result: ${e}`);
    }
  }

  fetchData(userId) {
    console.log(`Fetching data for user ${userId}...`);

    const user        = Meteor.users.findOne(userId);
    const fbUserId    = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;

    GameCreatorService.fetchData(fbUserId, accessToken);
  }

  fetchAllBoards() {
    const fetches = GameFetches.find().fetch();
    fetches.forEach(this.processFetch.bind(this));
  }

  processFetch(fetch) {
    try {
      const game = Games.findOne(fetch.getGameId());

      this.fetchGameBoard(fetch.getPlayerId());
      GameFetches.remove(fetch.getId());

      if (game.getPlayer1Board() && game.getPlayer2Board()) {
        game.status = GameStatus.Playing;
        GameRepository.save(game);
      }
    }
    catch(e) {
      console.error(`Server: could not fetch board for game ${fetch.getGameId()}. Reasons is: ${e.message}`);
      this.fetchFailed(fetch);
    }
  }

  fetchFailed(fetch) {
    fetch.incrementTries();

    if (fetch.getTries() >= 10) {
      const failedGame = Games.findOne(fetch.getGameId());
      failedGame.setStatus(GameStatus.Failed);
      GameRepository.save(failedGame);

      console.log(`Server: Maximum number of tries for game ${failedGame.getId()} reached`);

      const fetchId = fetch.getId();
      GameFetches.remove(fetchId);
    }
    else {
      GameFetchRepository.save(fetch);
    }
  }

};

global.Server = new Server();

