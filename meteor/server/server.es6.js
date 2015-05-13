
Server = function(){};

Server.fetchGameBoard = function(userId) {
    var [bot1, bot2] = BotService.bots();

    if (userId === bot1._id || userId === bot2._id){
        return GameBoard.FromRaw(userId, JSON.parse(Assets.getText("json/gameboards/gameboard1.json")));
    }

    const user = Meteor.users.findOne(userId);
    const fbUserId = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;
    const params = {
        user_id: fbUserId,
        access_token: accessToken
    };

    const url = `${Meteor.settings.gameCreatorUrl}/gameboard?${Querystring.encode(params)}`;

    console.log(`Server.fetchGameBoard(${userId}) - Fetching URL ${url}`);

    const get = Meteor.wrapAsync(Meteor.http.get);
    const result = get(url);

    return GameBoard.fromRaw(userId, result.data);
};


Server.fetchData = function(userId) {
    const user = Meteor.users.findOne(userId);
    const fbUserId = user.services.facebook.id;
    const accessToken = user.services.facebook.accessToken;
    const params = {
        user_id: fbUserId,
        access_token: accessToken
    };

    const url = `${Meteor.settings.gameCreatorUrl}/fetchData?${Querystring.encode(params)}`;

    console.log(`Server.fetchGameBoard(${userId}) - Fetching URL ${url}`);

    Meteor.http.get(url, function (err, res) {
        console.error(res.statusCode, res.data);
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
            f.tries += 1;
            if (f.tries >= 10){
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
}




