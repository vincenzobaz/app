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

        return new Game({
            player1: player1Id,
            player2: player2Id,
            status: GameStatus.Waiting,
            playerTurn: _.random(1, 2),
            player1Scores: {},
            player2Scores: {},
            boardState: boardState,
            player1AvailableMoves: GameService.createAvailableMoves(),
            player2AvailableMoves: GameService.createAvailableMoves()
        });
    },

    createAvailableMoves() {
        var available = [];

        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                available.push({row: i, column: j});
            }
        }
        return available;
    }
};
