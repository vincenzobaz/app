
AnswerService = {
    post(gameId, tileId, answers) {
        var game = Games.findOne(gameId);
        var board;
        var currentUser = this.userId ? this.userId : Bots[0]._id;
        if (currentUser === game.player1) {
            board = GameBoards.findOne(game.player1Board);
        } else if (currentUser === game.player2) {
            board = GameBoards.findOne(game.player2Board);
        } else {
            throw Meteor.Error(404, "Invalid gameId + " + gameId + "user does not play this game");
        }
        var tile = _.find(board.tiles, function(tile){return tile._id === tileId});
        if (tile){
            var correctAnswer = _.map(tile.questions, function(q){return q.answer});
            var result = _.reduce(_.map(_.zip(correctAnswer, answers), function(aa){
                return aa[0] === aa[1] ? 1 : 0;
            }), function(acc, r){return acc + r;}, 0);


            return {
                status: "success",
                data: {
                    correct: result,
                    wrong: 3 - result
                }
            }
        } else {
            throw Meteor.Error(404, "Invalid tileId + " + tileId);
        }

    }
};
