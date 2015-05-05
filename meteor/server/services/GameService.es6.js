GameService = {
    start(gameId) {
        console.log("starting game " + gameId);
        var game = Games.findOne(gameId);
        game.setStatus(GameStatus.Playing);
        GameRepository.save(game);
        return {status: "success"};
    }
};
