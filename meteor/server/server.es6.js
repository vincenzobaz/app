
Server = function(){};

Server.fetchGameBoard = function(userId) {
  const user = Meteor.users.findOne(userId);
  const fbUserId = user.services.facebook.id;
  const accessToken = user.services.facebook.accessToken;
  const params = {
    user_id: fbUserId,
    access_token: accessToken
  };

  const url = `${Meteor.settings.gameCreateorUrl}/gameboard?${Querystring.encode(params)}`;
  const get = Meteor.wrapAsync(Meteor.http.get);
  const result = get(url);
  return GameBoard.FromRaw(userId, result.data);
};


Server.fetchData = function(userId) {
  const user = Meteor.users.findOne(userId);
  const fbUserId = user.services.facebook.id;
  const accessToken = user.services.facebook.accessToken;
  const params = {
    user_id: fbUserId,
    access_token: accessToken
  };

  const url = `${Meteor.settings.gameCreateorUrl}/fetchData?${Querystring.encode(params)}`;
  Meteor.http.get(url, function (err, res) {
    console.error(res.statusCode, res.data);
  });
};

Server.createBotGame = function(strategy){
    try {
        var bot1 = Bots[0];
        var bot2 = Bots[1];
        var result = Meteor.call('JoinRequest.send', bot2._id);
        console.log(result.requestId);
        console.log(JoinRequests.findOne(result.requestId));
        var game = Meteor.call('JoinRequest.accept', result.requestId);
        var query = Games.find(game._id);
        var handle = query.observe({
            changed: function(newGame, oldGame) {
                console.log("it changed");
                if (newGame.player1 === bot1._id && newGame.playerTurn === 1){
                    console.log("bot 1 playing");
                    console.log(game);
                    var gameboard = GameBoards.findOne(game._player1Board);
                    console.log(gameboard)
                } else if (newGame.player2 === bot2._id && newGame.playerTurn === 2){
                    console.log("bot 2 playing");
                    console.log(game);

                    var gameboard = GameBoards.findOne(game._player2Board);
                    console.log(gameboard)
                }
            },
            added: function(id, fields) {
                console.log("it added");
            },
            removed: function(id) {
                console.log("it removed");
            }
        });
        console.log("game id " + game._id);
        Meteor.call('Game.start', game._id);
    } catch (err) {
        console.log("something went wrong: " + err.message);
        console.log(err);
    }


    //console.log(game);
};
