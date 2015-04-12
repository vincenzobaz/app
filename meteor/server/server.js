Server = function(){};

Server.fetchGameBoard = function(userId){
    var gameCreator = process.env.GAMECREATOR_URL;
    var url = gameCreator+ "/gameboard?user_id=" + userId;
    var get = Meteor.wrapAsync(Meteor.http.get);
    var result = get(url);
    return GameBoard.FromRaw(userId, result.data);
};