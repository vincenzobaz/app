
AnswerService = {
    post(gameId, tileId, answers) {
        var game = Games.findOne(gameId);
        var boardState = game.boardState;
        var board;
        var otherBoard;
        const board1 = GameBoards.findOne(game.player1Board);
        const board2 = GameBoards.findOne(game.player2Board);
        const currentTurn = game.playerTurn;
        var currentScoreId;
        var otherScoreId;

        var currentUser = this.userId;

        if (currentUser === game.player1 || game.player1 === Bots[0]._id && currentTurn === 1) {
            console.log('getting player 1 board');
            board = board1;
            otherBoard = board2;
            currentScoreId = "player1Scores";
            otherScoreId = "player2Scores";
        } else if (currentUser === game.player2 || game.player2 === Bots[1]._id && currentTurn === 2) {
            console.log('getting player 2 board');
            board = board2;
            otherBoard = board1;
            currentScoreId = "player2Scores";
            otherScoreId = "player1Scores";
        } else {
            throw Meteor.Error(404, "Invalid gameId + " + gameId + "user does not play this game");
        }
        var tile = _.find(board.tiles, function(tile){return tile._id === tileId});
        if (tile){
            const index = _.indexOf(board.tiles, tile);
            const row = Math.floor(index / 3);
            const col = index % 3;
            var correctAnswer = _.map(tile.questions, function(q){return q.answer});
            var result = _.map(_.zip(correctAnswer, answers), function(aa){
                return aa[0] === aa[1] ? 1 : 0;
            });
            var scores = [];
            for (var i = 0; i < tile.questions.length; i++){
                scores.push({questionId: tile.questions[i]._id, score: result[i]})
            }
            const oldScore = boardState[row][col].player === currentTurn? boardState[row][col].score : 0;
            const newScore = _.reduce(_.map(scores, function(s){return s.score}), function(add, x) {
                return add + x;
            });
            console.log(boardState);

            const otherScore = boardState[row][col].player !== currentTurn? boardState[row][col].score : 0;
            if (newScore > oldScore){
                game[currentScoreId][tile._id] = scores;
                if (otherScore < newScore){
                    boardState[row][col].player = currentTurn;
                    boardState[row][col].score = newScore;
                    console.log(boardState);

                }
            }
            game.playerTurn = game.playerTurn === 1 ? 2 : 1;
            GameRepository.save(game);
            return {
                win: this.playerWins(boardState, currentTurn, row, col),
                draw: this.isDraw(boardState)
            }
        } else {
            throw Meteor.Error(404, "Invalid tileId + " + tileId);
        }

    },

    playerWins(boardState, playerTurn, row, column) {
        for (var i = 0; i < boardState[row].length; i++){
            if (boardState[row][i].player !== playerTurn || boardState[row][i].score === 0){
                break;
            }
            if (i === boardState[row].length){
                return true;
            }
        }

        for (var j = 0; j < boardState.length; j++){
            if (boardState[j][column].player !== playerTurn || boardState[j][column].score === 0){
                break;
            }
            if (i === boardState.length){
                return true;
            }
        }

        if (row == column){
            for (var x = 0; x < boardState.length; x++){
                if (boardState[x][x].player !== playerTurn || boardState[x][x].score === 0){
                    break;
                }
                if (x == boardState.length){
                    return true;
                }
            }
        }
        return false;
    },
    isDraw(boardState) {
        const impossible = this.checkRows(boardState) +
            this.checkColumns(boardState) +
            this.checkDiagonal(boardState) +
            this.checkAntiDiagonal(boardState);

        return impossible === 8;



    },

    checkRows(boardState){
        var player = 0;
        var impossible = 0;
        for (var x = 0; x < boardState.length; x++){
            for (var y = 0; y < boardState.length; y++){
                if (boardState[x][y].score === 3){
                    if (player !== 0 && boardState[x][y].player !== player){
                        impossible++;
                        break;
                    }
                    player = boardState[x][y].player;
                }
            }
        }
        return impossible;
    },
    checkColumns(boardState){
        var player = 0;
        var impossible = 0;
        const n = 3;
        for (var x = 0; x < n; x++){
            for (var y = 0; y < n; y++){
                const cell = boardState[y][x];
                if (cell.score === 3){
                    if (player !== 0 && cell.player !== player){
                        impossible++;
                        break;
                    }
                    player = cell.player;
                }
            }
        }
        return impossible
    },
    checkDiagonal(boardState) {
        var player = 0;
        var impossible = 0;
        const n = 3;
        for (var x = 0; x < n; x++) {
            const cell = boardState[x][x];
            if (cell.score === 3) {
                if (player !== 0 && cell.player !== player) {
                    impossible++;
                    break;
                }
                player = cell.player;
            }

        }
        return impossible;
    },
    checkAntiDiagonal(boardState){
        var player = 0;
        var impossible = 0;
        const n = 3;
        var y = 2;
        for (var x = 0; x < n; x++) {
            const cell = boardState[y][x];
            if (cell.score === 3) {
                if (player !== 0 && cell.player !== player) {
                    impossible++;
                    break;
                }
                player = cell.player;
            }
            y--;
        }
        return impossible;
    }
};
