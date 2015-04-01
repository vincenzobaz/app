Meteor.publish("games", function () {
    return Games.find({ $or: [{player1 : this.userId}, {player2 : this.userId}]});
});

Meteor.publish("gameBoards", function(){
    var playerBoards = [];
    var currentUser = this.userId;
     Games.find({$or: [{player1 : this.userId}, {player2 : this.userId}]},
        {fields: {player1: 1, player1Board: 1, player2:1, player2Board: 1, _id: 0}}).forEach(function(g){
             if (g.player1 == currentUser){
                 playerBoards.push(g.player1Board)
             } else {
                 playerBoards.push(g.player2Board)
             }
     });
    return Gameboards.find({_id: {$in: playerBoards}});
});