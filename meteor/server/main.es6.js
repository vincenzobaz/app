
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
        [{player: 2, score: 3}, {player: 2, score: 2}, {player: 0, score: 0}],
        [{player: 0, score: 0}, {player: 1, score: 3}, {player: 2, score: 3}],
        [{player: 0, score: 0}, {player: 0, score: 0}, {player: 2, score: 3}]
    ];
    const result = BotService.getAvailableMoves(boardState, 1);
    BotService.createBotGame("Random");


    const test = [{row: 1, column: 1}, {row: 2, column: 2}, {row: 3, column: 3}]

    console.log(_.filter(test, m => {return m.row !== 2 || m.column !== 2}));
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
