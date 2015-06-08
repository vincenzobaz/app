
AnswerService = {
    post(currentUser, gameId, tileId, answers) {
        const game = Games.findOne(gameId);
        const boardState = game.boardState;
        const [board, currentScoreId] = AnswerService.getBoardAndScoreIdForCurrentPlayer(currentUser, game);
        const currentTurn = game.playerTurn;

        const tile = board.getTileById(tileId);

        if (tile){
            tile.setDisabled(true);
            const index = _.findIndex(board.getTiles(), t => t.getId() === tileId);
            const row = Math.floor(index / 3);
            const col = index % 3;
            const result = AnswerVerificationService.verifyTile(tile, answers);
            const questions = tile.getQuestions();
            const scores = [];
            for (let i = 0; i < questions.length; i++){
                let score = {
                    questionId: questions[i]._id,
                    score: result[i]
                };
                scores.push(score);
            }

            GamestatsService.updateStatsForQuestions(tile.getQuestions(), currentUser, result);
            const correctAnswersNum = scores.reduce((acc, s) => acc + s.score, 0);
            const newScore = _.reduce(_.map(scores, s => s.score), (add, x) => add + x);
            const otherScore = boardState[row][col].player !== currentTurn? boardState[row][col].score : 0;
            game.incrementCurrentPlayerScore(newScore);


            if (newScore === 3) {
                game.setPlayer1AvailableMoves(_.filter(game.getPlayer1AvailableMoves(), m => {return m.row !== row || m.column !== col}));
                game.setPlayer2AvailableMoves(_.filter(game.getPlayer1AvailableMoves(), m => {return m.row !== row || m.column !== col}));
            } else {
                if (currentTurn === 1){
                    game.setPlayer1AvailableMoves(_.filter(game.getPlayer1AvailableMoves(), m => {return m.row !== row || m.column !== col}));
                } else {
                    game.setPlayer2AvailableMoves(_.filter(game.getPlayer1AvailableMoves(), m => {return m.row !== row || m.column !== col}));
                }
            }

            if (newScore > otherScore || otherScore === 0){
                game[currentScoreId][tile._id] = scores;
                boardState[row][col].player = currentTurn;
                boardState[row][col].score = newScore;
            }

            const wins = AnswerService.playerWinsForRowAndColumn(boardState, currentTurn, row, col);
            const draw = AnswerService.isDraw(game);

            if ((wins || draw) && game.status !== GameStatus.Ended){
                if (wins){
                    GamestatsService.updateStatsGameWon(currentUser);
                    GamestatsService.updateStatsGameLost(game.getOpponentForUser(currentUser));
                    game.setWonBy(currentTurn);
                }

                if (draw) {
                    GamestatsService.updateStatsGameDraw(currentUser);
                    GamestatsService.updateStatsGameDraw(game.getOpponentForUser(currentUser));
                    game.setWonBy(0);
                }
                game.status = GameStatus.Ended;
            }

            game.nextTurn();

            GameRepository.save(game);
            GameBoardRepository.save(board);

            return {
                status: 'success',
                win: wins,
                draw: draw,
                correct: correctAnswersNum,
                wrong: questions.length - correctAnswersNum
            };
        } else {
            throw Meteor.Error(404, "Invalid tileId + " + tileId);
        }

    },

    /**
     * return {[GameBoard, String]}
     */
    getBoardAndScoreIdForCurrentPlayer(currentUser, game){
        if (currentUser === game.player1) {
            return [GameBoards.findOne(game.player1Board), "player1Scores"];
        } else if (currentUser === game.player2) {
            return [GameBoards.findOne(game.player2Board), "player2Scores"];
        } else {
            throw Meteor.Error(404, "Invalid gameId + " + game._id + "user does not play this game");
        }
    },


    playerWins(boardState, player) {

        if (AnswerService.verifyWonDiagonal(boardState, player) ||
            AnswerService.verifyWonAntiDiagonal(boardState, player)) {
            return true;
        }

        for (var i = 0; i < 3; i++){
            if (AnswerService.verifyWonRow(boardState, i, player)){
                return true;
            }
            if (AnswerService.verifyWonColumn(boardState,i, player)){
                return true;
            }
        }

        return false;
    },

    playerWinsForRowAndColumn(boardState, playerTurn, row, column) {

        return AnswerService.verifyWonRow(boardState, row, playerTurn) ||
            AnswerService.verifyWonColumn(boardState, column, playerTurn) ||
            AnswerService.verifyWonDiagonal(boardState, playerTurn) ||
            AnswerService.verifyWonAntiDiagonal(boardState, playerTurn);

    },

    verifyWonRow(boardState, row, player){
        for (var i = 0; i < 3; i++){
            if (boardState[row][i].player !== player || boardState[row][i].score === 0){
                return false;
            }
        }
        return true;
    },

    verifyWonColumn(boardState, column, player){
        for (var j = 0; j < 3; j++){
            if (boardState[j][column].player !== player || boardState[j][column].score === 0){
                return false;
            }
        }
        return true;

    },

    verifyWonDiagonal(boardState, player){
        for (var x = 0; x < 3; x++) {
            const cell = boardState[x][x];
            if (cell.player !== player || cell.score === 0) {
                return false;
            }
        }
        return true;
    },
    verifyWonAntiDiagonal(boardState, player) {
        var y = 2;
        for (var x = 0; x < 3; x++) {
            const cell = boardState[y][x];
            if (cell.player !== player || cell.score === 0) {
                return false;
            }
            y--;
        }

        return true;
    },

    isDraw(game) {
        if (game.getPlayerTurn() == 1){
            return (_.isEmpty(game.getPlayer1AvailableMoves()));
        } else {
            return (_.isEmpty(game.getPlayer2AvailableMoves()));
        }
    },

    checkRows(boardState){
        var player = 0;
        var impossible = 0;
        for (var x = 0; x < boardState.length; x++){
            for (var y = 0; y < boardState.length; y++){
                if (boardState[x][y].player !== player){
                    impossible++;
                    break;
                }
                Object.assign(player, boardState[x][y].player);
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
                if (cell.player !== player){
                    impossible++;
                    break;
                }
                Object.assign(player, cell.player);
            }

        }
        return impossible;
    },
    checkDiagonal(boardState) {
        var player = 0;
        var impossible = 0;
        const n = 3;
        for (var x = 0; x < n; x++) {
            const cell = boardState[x][x];
            if (player !== 0 && cell.player !== player) {
                impossible++;
                break;
            }
            Object.assign(player, cell.player);

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
            if (player !== 0 && cell.player !== player) {
                impossible++;
                break;
            }
            Object.assign(player, cell.player);
            y--;
        }
        return impossible;
    }





};
