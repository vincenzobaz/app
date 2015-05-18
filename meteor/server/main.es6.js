
Meteor.startup(() => {

    BotService.createBots();

    _.each(BotService.bots(), bot => console.log(`bot id ${bot._id}`))

    BotService.observeGameCreation();

    if (Meteor.settings.timeOutBetweenFetches == null) {
        throw new Error("Missing configuration entry: timeOutBetweenFetches");
    }

    Meteor.setInterval(Server.fetchAllBoards, Meteor.settings.timeOutBetweenFetches);

    if (process.env.BOTGAME === '1') {
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
