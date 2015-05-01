GameService = {
    start(gameId) {
        console.log("starting game " + gameId);
        var game = Games.findOne(gameId);
        game.status = "Playing";
        GameRepository.save(game);
        return {status: "success"};
    }
};
