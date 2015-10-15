
Server = class Server {

  static fetchGameBoard(userId) {
    console.log(`Fetching game board for user: ${userId}`);

    const [bot1, bot2] = BotService.bots();

    if (userId === bot1._id || userId === bot2._id) {
      console.log(`User ${userId} is a bot. Creating bot board`);

      const botBoard = JSON.parse(Assets.getText("json/gameboards/gameboard1.json"))
      return GameBoard.fromRaw(userId, botBoard);
    }

    const user        = Meteor.users.findOne(userId);
    const fbUserId    = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;

    const result = GameCreatorService.fetchGameboard(fbUserId, accessToken);

    try {
      const gameBoard = GameBoard.fromRaw(userId, result.data);
      console.log("managed to fetch gameboard " + gameBoard + " for user" + userId);
      return gameBoard;
    } catch (e) {
      console.error(`ERROR: Can't create gameboard from gamecreator result ${e}`)
    }
  }

  static fetchData(userId) {
    const user        = Meteor.users.findOne(userId);
    const fbUserId    = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;

    GameCreatorService.fetchData(fbUserId, accessToken);
  }

  static fetchAllBoards() {
    const fetches = GameFetches.find().fetch();
    fetches.forEach(Server.processFetch.bind(Server));
  }

  static processFetch(fetch) {
    try {
      const game = Games.findOne(fetch.getGameId());

      Server.fetchGameBoard(fetch.getPlayerId());
      GameFetches.remove(fetch.getId());

      if (game.getPlayer1Board() && game.getPlayer2Board()) {
        game.status = GameStatus.Playing;
        GameRepository.save(game);
      }
    }
    catch(e) {
      Server._fetchFailed(fetch);
    }
  }

  static _fetchFailed(fetch) {
      fetch.incrementTries();

      if (fetch.getTries() >= 10) {
        const fetchId = fetch.getId();
        GameFetches.remove(fetchId);

        const failedGame = Games.findOne(fetchId);
        console.log(`Server: Maximum number of tries for game ${failedGame.getId()} reached`);

        failedGame.setStatus(GameStatus.Failed);
        GameRepository.save(failedGame);
      }
      else {
        GameFetchRepository.save(fetch);
      }
  }

};

