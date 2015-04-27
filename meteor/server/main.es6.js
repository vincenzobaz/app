
Meteor.startup(() => {
    if (Meteor.users.find({username: {$in: ["bot1", "bot2"]}}).count() < 2){
        Accounts.createUser({
            username: "bot1",
            email : "bot1@reminisceme.com",
            password : "bot1password"
        });

        Accounts.createUser({
            username: "bot2",
            email : "bot2@reminisceme.com",
            password : "bot2password"
        });
        console.log("Creating Bot users");
    }

    Bots = Meteor.users.find({username: {$in: ["bot1", "bot2"]}}).fetch();

    Server.createBotGame("Random");

    if (GameBoards.find().count() == 0) {
        var board1 = JSON.parse(Assets.getText("json/gameboards/gameboard1.json"));
        var board2 = JSON.parse(Assets.getText("json/gameboards/gameboard2.json"));
        GameBoards.insert(board1);
        GameBoards.insert(board2);

    }

    if (Games.find().count() == 0) {
        var games = JSON.parse(Assets.getText("json/games/games.json"));
        _.map(games, function(g){
            Games.insert(g)
        });
    }
});

Accounts.onLogin(attempt => {
  if (!attempt.allowed) {
    return;
  }

  if (attempt.type === 'resume') {
    // TODO: Figure out if/when we need to trigger a new fetch on resume.
  }
  else {
    Server.fetchData(attempt.user._id);
  }
});
