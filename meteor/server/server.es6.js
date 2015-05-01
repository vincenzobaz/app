
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
    //try {
    var bot1 = Bots[0];
    var bot2 = Bots[1];
    var result = JoinRequestService.send(bot2._id);
    var game = JoinRequestService.accept(result.requestId);
    var query = Games.find(game._id);
    var handle1 = query.observe({
        changed: function(newGame, oldGame) {
            console.log("it changed");
            if (newGame.playerTurn === 1){
                setTimeout(Meteor.bindEnvironment(function(){Server.playTurn(newGame)}), 1000);
            }

        },
        added: function(id, fields) {
            console.log("it added");
        },
        removed: function(id) {
            console.log("it removed");
        }
    });
    var handle2 = query.observe({
        changed: function(newGame, oldGame) {
            console.log("it changed");
            if (newGame.playerTurn === 2){
                setTimeout(Meteor.bindEnvironment(function(){Server.playTurn(newGame)}), 1000);
            }

        },
        added: function(id, fields) {
            console.log("it added");
        },
        removed: function(id) {
            console.log("it removed");
        }
    });
    GameService.start(game._id);
    setTimeout(Meteor.bindEnvironment(function(){handle1.stop()}), 10000);
    setTimeout(Meteor.bindEnvironment(function(){handle2.stop();console.log("we are done");}), 10000);

    //} catch (err) {
    //    console.log("something went wrong: " + err.message);
    //    //console.log(err);
    //}


    //console.log(game);
};

Server.playTurn = function(game){
    if (game.getPlayerTurn() == 1){
        console.log("Bot1 playing");
        var boardId = "player1Board";
    } else {
        console.log("Bot2 playing");
        var boardId = "player2Board";
    }
    const gameBoard = GameBoards.findOne(game[boardId]);
    const tiles = gameBoard.getTiles();
    const tile = _.sample(tiles);
    if (tile.type === "MultipleChoice"){
        console.log("we got a MC");
        const choices = _.map(tile.questions, function(q){return q.choices});
        const answers = _.map(choices, function(c){return _.random(0, c.length - 1)});
        AnswerService.post(game._id, tile._id, answers);

    } else {
        console.log("we got type " + tile.type);
        const answers = _.map(tile.questions, function(q){
            const days = _.random(-q.minDate, q.maxDate);
            const answer = new Date(q.answer);
            answer.setDate(answer.getDate() - days);
            return answer});
        console.log(answers);
        AnswerService.post(game._id, tile._id, answers);
    }
};
