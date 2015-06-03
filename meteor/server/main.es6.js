
Meteor.startup(() => {

    BotService.createBots();
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

    // if (attempt.type === 'resume') {}

    const user = attempt.user;

    console.log(`Fetching data for user ${user._id}...`);
    Server.fetchData(user._id);

    // TODO: Move this somewhere else.
    console.log(`Fetching friends for user ${user._id}...`);
    const fbFriends = Facebook.getFriends(user);
    console.log('Got ' + fbFriends.length + ' friends: ', fbFriends);
    FriendRepository.updateFriends(user._id, fbFriends);
});
