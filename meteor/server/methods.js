Meteor.methods({
    'sayHello': function(text){
        console.log("hello " + text);
    },
    "fetchGameBoard": function(){
        var userId = "10153179507419968";
        var gameCreator = process.env.GAMECREATOR_URL;
        var url = gameCreator+ "/gameboard?user_id=" + userId;
        console.log(url);

        Meteor.http.get(url, function(err, res){
            if (err){
                console.log("Fetching Gameboard for user " + userId + " went wrong " + err)
            } else {
                Gameboards.insert(res.data);
            }

        });
    },
    'fetchData': function(){
        var accesstoken = "CAACEdEose0cBAM810upRgDgZAkh5fUm9iNknOhbWfGfJrsYAFowKR6oPTomH87s7kYn7pnVcNOu2iVudoaVXhO3wVDfjEGetjeA1TKVsQkxOGhLtWY6oi9QwnAo11DddNkABttO4NeDFLknlTxKZC7HaXDPeRHg1ZBGeAeiRWLcJ80WbLRkY0Y2RRRq82ISR3rqEl8r7MEEsG7VmEMBgwJoou6YV94ZD";
        var userId = "10153179507419968";
        var gameCreator = process.env.GAMECREATOR_URL;

        var url = gameCreator + "/fetchData?user_id=" + userId + "&access_token=" + accesstoken;
        console.log(url);
        Meteor.http.get(url, function (err, res) {
            console.log(res.statusCode, res.data);
        });
    },

    'JoinRequest.decline': function(id) {
        JoinRequests.remove(id);
        var future = new Future();
        future.return({status: "success", error: null});

        return future.wait();
    },

    'JoinRequest.accept': function(id) {
        console.log("Join request accepted" + id);
        return {status: "success"};
    },

    'JoinRequest.send': function(userId) {
        var future = new Future();
        JoinRequests.insert({from: Meteor.userId(), to: userId}, function(error, requestId){
            if (!error){
                var game = new Game(null, Meteor.userId(), userId, null, null, "waiting", _.random(1,2), null, null);
                game.save(function(error, gameId){
                   if (!error){
                       future.return({status: "success", requestId: requestId, gameId: "blblb"});
                   } else {
                       future.return({status: "error", error: error});
                   }
                });
            } else {
                future.return({status: "error", error: error});
            }
        });
        return future.wait();

    },

    'Game.start': function(userId) {
        var gameId = "example";
        return {status: "success"};
    },
    'Game.quit': function(gameId) {
        return {status: "success"};
    },
    'Game.timeout': function(gameId){
        return {status: "success"};
    },
    /**
     *
     * @param {string} gameId ObjectId - Id of the game
     * @param {string} tileId ObjectId - Id of tile
     * @param {Object[]} answers Array of answers - the answer selected
     * @returns {{status: string, data: {correct: number, wrong: number}}}
     */
    'Answer.post': function(gameId, tileId, answers){
        return {
            status: "success",
            data: {
                correct: 3,
                wrong: 1
            }
        }
    }



});