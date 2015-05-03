
BotService = {

    // TODO: Move elsewhere
    bots() {
        return Meteor.users.find({username: {$in: ["bot1", "bot2"]}});
    },

    botsCreated() {
        return this.bots().count() >= 2;
    },

    createBots(force = false) {
      if (force || !this.botsCreated()) {
          console.log("Creating Bot users");

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
      }
    }

};

