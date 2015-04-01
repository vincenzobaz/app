
Meteor.startup(function () {
    // code to run on server at startup
    var myjson = {};
    //myjson = JSON.parse(Assets.getText("json/currentGames.json"));
    //console.log(myjson);

    //if (Meteor.users.count() == 0){
    //    var user1 = JSON.parse(Assets.getText("json/users/user1.json"));
    //    Meteor.users.insert(user1)
    //}



    if (Gameboards.find().count() == 0) {
        console.log("We have no gameboards");
    }

    if (Games.find().count() == 0) {
        var games = JSON.parse(Assets.getText("json/games/game1.json"));
        _.map(games, function(g){
            Games.insert(g)
        });
    }
});


