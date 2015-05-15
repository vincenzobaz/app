
AnswerService = {
    post(currentUser, gameId, tileId, answers) {
        const game = Games.findOne(gameId);
        const boardState = game.boardState;
        const [board, currentScoreId] = AnswerService.getBoardAndScoreIdForCurrentPlayer(currentUser, game);
        const currentTurn = game.playerTurn;

        const tile = board.getTileById(tileId);

        if (tile){
            const index = _.findIndex(board.getTiles(), tile => tile.getId() == tileId);
            const row = Math.floor(index / 3);
            const col = index % 3;
            const result = AnswerService.getResultsForTile(tile, answers);
            const questions = tile.getQuestions();
            const scores = [];
            for (var i = 0; i < questions.length; i++){
                scores.push({questionId: questions[i]._id, score: result[i]})
            }
            const correctAnswersNum = scores.reduce((acc, s) => acc + s.score, 0);
            const oldScore = boardState[row][col].player === currentTurn? boardState[row][col].score : 0;
            const newScore = _.reduce(_.map(scores, function(s){return s.score}), function(add, x) {
                return add + x;
            });
            const otherScore = boardState[row][col].player !== currentTurn? boardState[row][col].score : 0;
            if (newScore > oldScore){
                game[currentScoreId][tile._id] = scores;
                if (otherScore < newScore){
                    boardState[row][col].player = currentTurn;
                    boardState[row][col].score = newScore;
                }
            }

            const wins = AnswerService.playerWins(boardState, currentTurn, row, col);
            const draw = AnswerService.isDraw(boardState);
            if (wins || draw){
                game.status = "finished";
            }

            game.playerTurn = game.playerTurn === 1 ? 2 : 1;

            GameRepository.save(game);

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

    getBoardAndScoreIdForCurrentPlayer(currentUser, game){
        if (false && currentUser === game.player1) {
            return [GameBoards.findOne(game.player1Board), "player1Scores"];
        } else if (currentUser === game.player2) {
            return [GameBoards.findOne(game.player2Board), "player2Scores"];
        } else {
            throw Meteor.Error(404, "Invalid gameId + " + game._id + "user does not play this game");
        }
    },

    getResultsForTile(tile, answers) {
        const questionAnswers = _.zip(tile.getQuestions(), answers);
        if (tile.type === "MultipleChoice"){
            return _.map(questionAnswers, qa => AnswerService.verifyAnswerMultipleChoice(qa[0], qa[1].data));
        } else if (tile.type === "Timeline"){
            return _.map(questionAnswers, qa => AnswerService.verifyAnswerTimeLine(qa[0], qa[1].data));
        } else if (tile.type === "Geolocation"){
            return _.map(questionAnswers, qa => AnswerService.verifyAnswerGeolocation(qa[0], qa[1].data));
        } else if (tile.type === "Misc"){
            return _.map(questionAnswers, qa => {
                if (qa[0].getKind() === "Timeline"){
                    return AnswerService.verifyAnswerTimeLine(qa[0], qa[1].data);
                } else if (qa[0].getKind() === "MultipleChoice"){
                    return AnswerService.verifyAnswerMultipleChoice(qa[0], qa[1].data);
                } else if (qa[0].getKind() === "Geolocation") {
                    return AnswerService.verifyAnswerGeolocation(qa[0], qa[1].data);
                } else {
                    console.log("got invalid question kind " + qa[0].getKind());
                    return true;
                }
            });
        } else {
            throw new Meteor.Error(500, `Invalid question type: '${tile.type}'`);
        }
    },

    verifyAnswerMultipleChoice(question, answer) {
        return question.answer === answer ? 1 : 0;
    },

    verifyAnswerTimeLine(question, answer) {
        var min = new Date(answer.date);
        var max = new Date(answer.date);
        const threshold = question.getThreshold();

        switch(question.getUnit()) {
            case TimelineUnit.Day:
                min = new Date(question.answer).adjustDateDays(-threshold);
                max = new Date(question.answer).adjustDateDays(threshold);
                break;

            case TimelineUnit.Week:
                min = new Date(question.answer).adjustDateWeek(-threshold);
                max = new Date(question.answer).adjustDateWeek(threshold);
                break;

            case TimelineUnit.Month:
                min = new Date(question.answer).adjustDateMonth(-threshold);
                max = new Date(question.answer).adjustDateMonth(threshold);
                break;

            case TimelineUnit.Year:
                min = new Date(question.answer).adjustDateYear(-threshold);
                max = new Date(question.answer).adjustDateYear(threshold);
                break;

            default:
                throw new Meteor.Error(500, `Unknown unit ${question.getUnit()}`);
        }

        console.log(`min: ${min}, max: ${max}, answer: ${new Date(answer.date)} (${answer.date})`);

        return min.getTime() <= new Date(answer.date).getTime() && new Date(answer.date).getTime() <= max.getTime() ? 1 : 0;

    },

    verifyAnswerGeolocation(question, answer) {
        // FIXME: Handle Geolocations properly

        return true;
    },

    playerWins(boardState, playerTurn, row, column) {

        return AnswerService.verifyWonRow(boardState, row, playerTurn) ||
            AnswerService.verifyWonColumn(boardState, column, playerTurn) ||
            AnswerService.verifyWonDiagonal(boardState, playerTurn) ||
            AnswerService.verifyWonAntiDiagonal(boardState, playerTurn)

    },

    verifyWonRow(boardState, row, player){
        for (var i = 0; i < 3; i++){
            if (boardState[row][i].player !== player || boardState[row][i].score === 0){
                return false;
            }
            if (i === boardState[row].length - 1){
                return true;
            }
        }
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
            if (cell.player !== player) {
                return false
            }
        }
        return true;
    },
    verifyWonAntiDiagonal(boardState, player) {
        var y = 2;
        for (var x = 0; x < 3; x++) {
            const cell = boardState[y][x];
            if (cell.player !== player) {
                return false;
            }
            y--;
        }
        return true;
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
                    Object.assign(player, boardState[x][y].player);
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
                    Object.assign(player, cell.player);
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
                Object.assign(player, cell.player);
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
                Object.assign(player, cell.player);
            }
            y--;
        }
        return impossible;
    }
};
