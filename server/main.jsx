
Meteor.startup(() => {

    BotService.createBots();
    BotService.observeGameCreation();

    if (process.env.TIMEOUT_BETWEEN_FETCHES == null) {
        throw new Error("Missing environment variable: TIMEOUT_BETWEEN_FETCHES");
    }

    Meteor.setInterval(Server.fetchAllBoards, process.env.TIMEOUT_BETWEEN_FETCHES);

    if (process.env.BOTGAME === '1') {
        BotService.createBotGame("Random");
    }

    console.error("moment ", moment().year());
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
    FriendRepository.updateFriends(user._id, fbFriends);

    FriendRepository.addBots(user._id, BotService.botsAsFriends());
});
