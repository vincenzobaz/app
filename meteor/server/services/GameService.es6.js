GameService = {
    start(gameId) {
        console.log("starting game " + gameId);
        var game = Games.findOne(gameId);
        game.setStatus(GameStatus.Playing);
        GameRepository.save(game);
        return {status: "success"};
    },

    createGame(player1Id, player2Id) {
        const boardState = [
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}],
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}],
            [{player: 0, score: 0}, {player: 0, score: 0}, {player: 0, score: 0}]
        ];
        return new Game(null, player1Id, player2Id, undefined, undefined, "waiting", _.random(1,2), {}, {}, boardState);


    }
};
