
Server = function(){};

Server.fetchGameBoard = function(userId) {
    if (userId === Bots[0]._id || userId === Bots[1]._id){
        return GameBoard.FromRaw(userId, JSON.parse(Assets.getText("json/gameboards/gameboard1.json")));
    }
    console.log('What the fuck ' + userId);
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
    var result = Meteor.call('JoinRequest.send', bot1._id);
    var game = JoinRequestService.accept(result.requestId);
    var query = Games.find(game.id);
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
    //GameService.start(game.id);

    Server.playTurn(game);

    console.log("we are done");
    } catch (err) {
        console.log("something went wrong: " + err.message);
        //console.log(err);
    }


    //console.log(game);
};

Server.playTurn = function(game){


    if (game.getPlayerTurn() == 1){
        console.log("Bot1 playing");
        var gameId = "player1Board";


    } else {
        console.log("Bot2 playing");
        var gameId = "player2Board";

    }
    const gameBoard = GameBoards.findOne(game[gameId]);
    const tiles = gameBoard.getTiles();
    const tile = _.sample(tiles);
    //console.log(tile);
    if (tile.type === "MultipleChoice"){
        console.log("we got a MC");
        const choices = _.map(tile.questions, function(q){return q.choices});
        const answers = _.map(choices, function(c){return _.random(0, c.length - 1)});
        AnswerService.post(game.id, tile._id, answers);
    } else {
        console.log("we got type " + tile.type);
        const answers = _.map(tile.questions, function(q){
            console.log(q);
            const days = _.random(-q.minDate, q.maxDate);
            const answer = new Date(q.answer);
            answer.setDate(answer.getDate() - days);
            return answer})
        console.log(answers);
        AnswerService.post(game.id, tile._id, answers);

    }
};
