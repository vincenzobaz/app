
Meteor.publish("games", function () {
    // console.log('Publishing games');
    return Games.find({ $or: [{player1 : this.userId}, {player2 : this.userId}]});
});

Meteor.publish("gameBoards", function(){
    // console.log('Publishing gameBoards');
    return GameBoards.find({ userId: this.userId });
});

Meteor.publish("joinRequests", function(){
    // console.log('Publishing joinRequests...');
    return JoinRequests.find({to: this.userId});
});

// TODO: Don't publish access token etc.
Meteor.publish('userServices', function() {
  // console.log('Publishing userServices...');
  return Meteor.users.find(
    { _id: this.userId },
    { fields: { 'services': 1 } }
  );
});

Meteor.publish('friends', function() {
    // console.log('Publishing friends...');
    return Friends.find({ friendOf: this.userId });
});

