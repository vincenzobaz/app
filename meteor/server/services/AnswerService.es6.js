
AnswerService = {
    post(currentUser, gameId, tileId, answers) {
        const game = Games.findOne(gameId);
        const boardState = game.boardState;
        const [board, currentScoreId] = AnswerService.getBoardAndScoreIdForCurrentPlayer(currentUser, game);
        const currentTurn = game.playerTurn;

        const tile = board.getTileById(tileId);

        if (tile){
            const index = _.findIndex(board.getTiles(), t => t.getId() === tileId);
            const row = Math.floor(index / 3);
            const col = index % 3;
            const result = AnswerService.getResultsForTile(tile, answers);
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
            const oldScore = boardState[row][col].player === currentTurn? boardState[row][col].score : 0;
            const newScore = _.reduce(_.map(scores, s => s.score), (add, x) => add + x);
            const otherScore = boardState[row][col].player !== currentTurn? boardState[row][col].score : 0;

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

            if (newScore >= oldScore || oldScore === 0){
                game[currentScoreId][tile._id] = scores;
                if (otherScore < newScore){
                    boardState[row][col].player = currentTurn;
                    boardState[row][col].score = newScore;
                }
            }

            const wins = AnswerService.playerWinsForRowAndColumn(boardState, currentTurn, row, col);
            const draw = AnswerService.isDraw(game);

            if (wins || draw){
                if (wins){
                    GamestatsService.updateStatsGameWon(currentUser);
                    GamestatsService.updateStatsGameLost(game.getOpponentForUser(currentUser));
                }

                if (draw) {
                    GamestatsService.updateStatsGameDraw(currentUser);
                    GamestatsService.updateStatsGameDraw(game.getOpponentForUser(currentUser));
                }
                game.status = GameStatus.Ended;
            }

            // FIXME: Just a temporary hack to fix #61
            Meteor.setTimeout(() => {
                game.nextTurn();
                GameRepository.save(game);
            }, 5 * 1000);

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
        if (currentUser === game.player1) {
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
        console.log('multiple choice answer: %d %d', question.answer, answer.choice);
        return question.answer === answer.choice ? 1 : 0;
    },

    verifyAnswerTimeLine(question, answer) {
        const answerDate = new Date(answer);
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

        //console.log(`min: ${min}, max: ${max}, answer: ${answerDate} (${answer})`);

        return min.getTime() <= answerDate.getTime() && answerDate <= max.getTime() ? 1 : 0;

    },

    verifyAnswerGeolocation(question, answer) {
        // FIXME: Handle Geolocations properly

        return 1;
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
            if (boardState[row][i].player !== player){
                return false;
            }
        }
        //console.log(`player: ${player} won through row`);
        return true;
    },

    verifyWonColumn(boardState, column, player){
        for (var j = 0; j < 3; j++){
            if (boardState[j][column].player !== player){
                return false;
            }
        }
        //console.log(`player: ${player} won through column`);

        return true;

    },

    verifyWonDiagonal(boardState, player){
        for (var x = 0; x < 3; x++) {
            const cell = boardState[x][x];
            if (cell.player !== player) {
                return false;
            }
        }
        //console.log(`player: ${player} won through diag`);

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
    },





};
