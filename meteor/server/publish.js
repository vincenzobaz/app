Meteor.publish("games", function () {
    return Games.find({ $or: [{player1 : this.userId}, {player2 : this.userId}]});
});