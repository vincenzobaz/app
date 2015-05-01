
AnswerService = {
    post(gameId, tileId, answers) {
        var game = Games.findOne(gameId);
        var board;
        var currentUser = this.userId;
        if (currentUser === game.player1 || game.player1 === Bots[0]._id && game.playerTurn === 1) {
            console.log('getting player 1 board');
            board = GameBoards.findOne(game.player1Board);
        } else if (currentUser === game.player2 || game.player2 === Bots[1]._id && game.playerTurn === 2) {
            console.log('getting player 2 board');
            board = GameBoards.findOne(game.player2Board);
        } else {
            throw Meteor.Error(404, "Invalid gameId + " + gameId + "user does not play this game");
        }
        var tile = _.find(board.tiles, function(tile){return tile._id === tileId});
        if (tile){
            var correctAnswer = _.map(tile.questions, function(q){return q.answer});
            var result = _.map(_.zip(correctAnswer, answers), function(aa){
                return aa[0] === aa[1] ? 1 : 0;
            });
            var scores = [];
            for (var i = 0; i < tile.questions.length; i++){
                scores.push({questionId: tile.questions[i]._id, score: result[i]})
            }
            game.player1Scores[tile._id] = {scores};
            game.playerTurn = game.playerTurn === 1 ? 2 : 1;
            console.log("scores");
            console.log(scores);
            GameRepository.save(game);
            return {
                status: "success",
                data: scores
            }
        } else {
            throw Meteor.Error(404, "Invalid tileId + " + tileId);
        }

    }
};
