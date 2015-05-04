
GameBoards = new Mongo.Collection('gameBoards', {
    transform(doc) {
        return new GameBoard(doc);
    }
});

