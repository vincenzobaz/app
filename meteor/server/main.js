
Meteor.startup(function () {
    // code to run on server at startup
    var myjson = {};
    //myjson = JSON.parse(Assets.getText("json/currentGames.json"));
    //console.log(myjson);

    //if (Meteor.users.count() == 0){
    //    var user1 = JSON.parse(Assets.getText("json/users/user1.json"));
    //    Meteor.users.insert(user1)
    //}

    Future = Npm.require('fibers/future');


    if (Gameboards.find().count() == 0) {
        var board1 = JSON.parse(Assets.getText("json/gameboards/gameboard1.json"));
        var board2 = JSON.parse(Assets.getText("json/gameboards/gameboard2.json"));
        Gameboards.insert(board1);
        Gameboards.insert(board2);

    }

    if (Games.find().count() == 0) {
        var games = JSON.parse(Assets.getText("json/games/games.json"));
        _.map(games, function(g){
            Games.insert(g)
        });
    }
});


