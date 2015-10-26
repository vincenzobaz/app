
GameBoards = new Mongo.Collection('gameBoards', {
    transform(doc) {
        return GameBoard.fromRaw(doc);
    }
});

