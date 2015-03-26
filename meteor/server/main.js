
Meteor.startup(function () {
    // code to run on server at startup
    var myjson = {};
    //myjson = JSON.parse(Assets.getText("json/currentGames.json"));
    //console.log(myjson);

    //if (Meteor.users.count() == 0){
    //    var user1 = JSON.parse(Assets.getText("json/users/user1.json"));
    //    Meteor.users.insert(user1)
    //}



    //if (Gameboards.find().count() == 0){
    //    console.log("We have no gameboards");
    //}
});

Meteor.methods({
    sayHello: function(text){
        console.log("hello " + text);
    },
    fetchGameBoard: function(){
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
    fetchData: function(){
        var accesstoken = "CAACEdEose0cBAM810upRgDgZAkh5fUm9iNknOhbWfGfJrsYAFowKR6oPTomH87s7kYn7pnVcNOu2iVudoaVXhO3wVDfjEGetjeA1TKVsQkxOGhLtWY6oi9QwnAo11DddNkABttO4NeDFLknlTxKZC7HaXDPeRHg1ZBGeAeiRWLcJ80WbLRkY0Y2RRRq82ISR3rqEl8r7MEEsG7VmEMBgwJoou6YV94ZD";
        var userId = "10153179507419968";
        var gameCreator = process.env.GAMECREATOR_URL;

        var url = gameCreator + "/fetchData?user_id=" + userId + "&access_token=" + accesstoken;
        console.log(url);
        Meteor.http.get(url, function (err, res) {
            console.log(res.statusCode, res.data);
        });
    }


});
