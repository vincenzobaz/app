
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
    const boardState = [
        [{player: 0, score: 0}, {player: 1, score: 0}, {player: 2, score: 3}],
        [{player: 0, score: 0}, {player: 0, score: 0}, {player: 2, score: 3}],
        [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}]
    ];
    const result = BotService.getAvailableMoves(boardState, 1);

    console.log(`bot1: ${BotService.bots()[0]._id}`);
    console.log(`bot2: ${BotService.bots()[1]._id}`);
    console.log(result);

    BotService.createBotGame("whatever");


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
