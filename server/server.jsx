
Server = function(){};

Server.fetchGameBoard = function(userId) {
    var [bot1, bot2] = BotService.bots();
    console.log(`fetching for: ${userId}`);
    if (userId === bot1._id || userId === bot2._id){
        console.log("creating bot board");
        return GameBoard.fromRaw(userId, JSON.parse(Assets.getText("json/gameboards/gameboard1.json")));
    }

    const user = Meteor.users.findOne(userId);
    const fbUserId = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;
    const params = {
        user_id: fbUserId,
        access_token: accessToken
    };

    const url = `${process.env.GAME_CREATOR_URL}/gameboard?${Querystring.encode(params)}`;

    console.log(`Server.fetchGameBoard(${userId}) - Fetching URL ${url}`);

    const get = Meteor.wrapAsync(Meteor.http.get);
    const result = get(url);

    try {
        const gameBoard = GameBoard.fromRaw(userId, result.data);
        console.log("managed to fetch gameboard " + gameBoard + " for user" + userId);
        return gameBoard;

    } catch (e) {
        console.error("ERROR: Can't create gameboard from gamecreator result " + e )
    }
};

/*eslint camelcase:0*/
Server.fetchData = function(userId) {
    const user = Meteor.users.findOne(userId);
    const fbUserId = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;
    const params = {
        user_id: fbUserId,
        access_token: accessToken
    };

    const url = `${process.env.GAME_CREATOR_URL}/fetchData?${Querystring.encode(params)}`;

    console.log(`Server.fetchGameBoard(${userId}) - Fetching URL ${url}`);

    Meteor.http.get(url, function (err, res) {
        if (err) {
            console.error(err);
        }
        if (res) {
            console.error(res.statusCode, res.data);
        }
    });
};

Server.fetchAllBoards = function() {
    const fetches = GameFetches.find().fetch();
    _.each(fetches, function(f){
        try {
            const game = Games.findOne(f.getGameId());
            Server.fetchGameBoard(f.getPlayerId());
            GameFetches.remove(f.getId());
            if (game.getPlayer1Board() && game.getPlayer2Board()){
                game.status = GameStatus.Playing;
                GameRepository.save(game);
            }
        } catch(e) {
            f.incrementTries();
            if (f.getTries() >= 10) {
                console.log(f);
                GameFetches.remove(f.getId());
                const failedGame = Games.findOne(f.getGameId());

                failedGame.setStatus(GameStatus.Failed);
                console.log("maximum number of tries for game " + failedGame.getId() + " reached");
                GameRepository.save(failedGame);
            } else {
                GameFetchRepository.save(f);
            }
        }
    });
};




