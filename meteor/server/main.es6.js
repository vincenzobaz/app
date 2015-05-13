
Meteor.startup(() => {

    BotService.createBots();

    _.each(BotService.bots(), function(b){console.log(`bot id ${b._id}`)})


    BotService.observeGameCreation();


    Meteor.setInterval(Server.fetchAllBoards, Meteor.settings.timeOutBetweenFetches);

    if (process.env.BOTGAME == 1){
        BotService.createBotGame("Random");
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
