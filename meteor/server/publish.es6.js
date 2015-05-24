Meteor.publish("games", function () {
    console.log('Publishing games');
    return Games.find({ $or: [{player1 : this.userId}, {player2 : this.userId}]});
});

// FIXME: We'd better store the id of the user whom the board is for in the GameBoard document.
Meteor.publish("gameBoards", function(){
    console.log('Publishing gameBoards');
    // var playerBoards = [];
    //  Games.find({$or: [{player1 : this.userId}, {player2 : this.userId}]},
    //     {fields: {player1: 1, player1Board: 1, player2:1, player2Board: 1, _id: 0}}).forEach(function(g){
    //          if (g.player1 == this.userId){
    //              playerBoards.push(g.player1Board)
    //          } else {
    //              playerBoards.push(g.player2Board)
    //          }
    //  });
    // return GameBoards.find({_id: {$in: playerBoards}});
    return GameBoards.find();
});

Meteor.publish("joinRequests", function(){
    console.log('Publishing joinRequests...');
    return JoinRequests.find({to: this.userId});
});

// TODO: Don't publish access token etc.
Meteor.publish('userServices', function() {
  console.log('Publishing userServices...');
  return Meteor.users.find(
    { _id: this.userId },
    { fields: { 'services': 1 } }
  );
});

Meteor.publish('friends', function() {
    console.log('Publishing friends...');
    return Friends.find({ friendOf: this.userId });
});

