
Meteor.startup(() => {

    BotService.createBot();
    BotService.observeGameCreation();

    if (process.env.TIMEOUT_BETWEEN_FETCHES == null) {
        throw new Error("Missing environment variable: TIMEOUT_BETWEEN_FETCHES");
    }

    Meteor.setInterval(Server.fetchAllBoards.bind(Server), process.env.TIMEOUT_BETWEEN_FETCHES);
});

Accounts.onLogin(attempt => {
    if (!attempt.allowed) {
        return;
    }

    // if (attempt.type === 'resume') {}

    const user = attempt.user;

    Server.fetchData(user._id);

    console.log(`Fetching friends for user ${user._id}...`);

    const fbFriends = Facebook.getFriends(user);
    FriendRepository.updateFriends(user._id, fbFriends);
    FriendRepository.addBot(user._id, BotService.botAsFriend());
});

