Meteor.publish("games", function () {
    return Gameboards.find();
});