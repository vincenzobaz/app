
BotService = {

    // TODO: Move elsewhere
    bots() {
        return Meteor.users.find({username: {$in: ["bot1", "bot2"]}}).fetch();
    },

    botsAsFriends() {
        return this.bots().map(bot => { return {
            name: bot.profile.name,
            id: bot._id,
            isBot: true
        }});
    },

    botsCreated() {
        return BotService.bots().length >= 2;
    },

    createBots(force = false) {
        if (force || !BotService.botsCreated()) {
            console.log("Creating Bot users");

            Accounts.createUser({
                username: "bot1",
                email: "bot1@reminisceme.com",
                password: "bot1password",
                profile: {
                    name: "Bot #1"
                }
            });

            Accounts.createUser({
                username: "bot2",
                email: "bot2@reminisceme.com",
                password: "bot2password",
                profile: {
                    name: "Bot #2"
                }
            });
        }
    },

    observeGameCreation() {
        var [bot1, bot2] = BotService.bots();
        var query1 = Games.find({$or: [{player1: bot1._id}, {player2: bot1._id}]});

        var handle1 = query1.observe({
            added: function (game) {
                console.log(`Starting to observe game ${game._id}`);
                BotService.observeGame(game._id, bot1._id);
            },
            removed: function (id) {
                console.log("it removed");
            }
        });

        var query2 = Games.find({$or: [{player1: bot2._id}, {player2: bot2._id}]});

        var handle2 = query2.observe({
            added: function (game) {
                console.log("it added");
                BotService.observeGame(game._id, bot2._id);
            },
            removed: function (id) {
                console.log("it removed");
            }
        });
    },

    createBotGame(strategy) {
        console.log("creating bot game");
        var [bot1, bot2] = BotService.bots();
        var result = JoinRequestService.send(bot1._id, bot2._id);
        var game = JoinRequestService.accept(result.requestId);
        GameService.start(game._id);
    },

    observeGame(gameId, botId) {
        var query = Games.find(gameId);
        var game = Games.findOne(gameId);
        var botTurn = game.player1 === botId ? 1 : 2;
        var handle1 = query.observe({
            changed: function (newGame, oldGame) {
                if (newGame.playerTurn === botTurn) {
                    setTimeout(Meteor.bindEnvironment(function () {
                        BotService.drawBoardState(newGame);
                        if (newGame.status !== GameStatus.Ended && newGame.status !== GameStatus.Waiting) {
                            const result = BotService.playTurn(newGame);

                            if (result.win || result.draw) {
                                handle1.stop();
                                newGame.status = GameStatus.Ended;
                                GameRepository.save(newGame);
                                console.log(`Game ended: Player${botTurn} won:${result.win}, Draw: ${result.draw}`);
                            }
                        }

                    }), 100);
                }

            }
        });
    },

    playTurn(game) {
        var boardId;
        var answers;
        var player;
        if (game.getPlayerTurn() == 1) {
            console.log("Bot1 playing");
            boardId = "player1Board";
            player = game.player1;
        } else {
            console.log("Bot2 playing");
            boardId = "player2Board";
            player = game.player2;
        }
        const gameBoard = GameBoards.findOne(game[boardId]);
        console.log(`gameBoard found: ${gameBoard}`);
        const tile = BotService.pickTile(game, gameBoard);
        if (tile.type === "MultipleChoice") {
            console.log("we got a MC");
            const choices = _.map(tile.questions, function (q) {
                return q.choices
            });
            answers = _.map(choices, function (c) {
                return _.random(0, c.length - 1)
            });
            return AnswerService.post(player, game._id, tile._id, answers);

        } else {
            console.log("we got type " + tile.type);
            answers = _.map(tile.questions, function (q) {
                const days = _.random(-q.minDate, q.maxDate) * 24 * 60 * 60 * 1000;
                return new Date(new Date(q.answer).getTime() + days);
            });
            return AnswerService.post(player, game._id, tile._id, answers);
        }

    },

    pickTile(game, gameBoard) {
        console.log(`gameboard: ${gameBoard}`);
        const tiles = gameBoard.getTiles();
        const boardState = game.boardState;
        const indexTiles = _.zip(_.range(9), _.flatten(boardState));
        const result = BotService.minmax(game, game.getCurrentPlayer());
        console.log(`result: ${result}`);
        return tiles[result.move.row * 3 + result.move.column];
        //const potentialTiles = _.filter(indexTiles, function (t) {
        //    return t[1].player === 0
        //});
        //if (potentialTiles.length > 0) {
        //    return tiles[_.sample(potentialTiles)[0]];
        //} else {
        //    return _.sample(tiles);
        //}
    },

    minmax(game, player) {
        const score = BotService.score(game.boardState, game.getCurrentPlayer());
        if (score !== 0){
            return {move: null, score: score};
        }

        var scores = [];
        var moves = [];

        const possibilities = BotService.getAvailableMoves(game.boardState, game.getCurrentPlayer());
        _.forEach(possibilities, m => {
            const updatedGame = makeMove(game, m);
            scores.push(BotService.minmax(updatedGame, player).score);
            moves.push(m);
        });

        if (game.getCurrentPlayer() == player){
            const maxScoreIndex = _.indexOf(scores, _.max(scores));
            const move = moves[maxScoreIndex];
            return {move: move, score: scores[maxScoreIndex]}
        } else {
            const minScoreIndex = _.indexOf(scores, _.min(scores));
            const move = moves[minScoreIndex];
            return {move: move, score: scores[minScoreIndex]}
        }
    },

    makeMove(game, move, player) {
        const newGame  = _.extend(game);
        newGame.boardState[move.row][move.column] = {player: player, score: 3};
        newGame.setPlayerTurn((player  % 2) + 1);
        return newGame;
    },

    score(boardState, currentPlayer) {
      if (AnswerService.playerWins(boardState, currentPlayer)){
          return 10;
      } else if (AnswerService.playerWins(boardState, (currentPlayer  % 2) + 1)){
          return - 10;
      } else {
          return 0;
      }
    },

    getAvailableMoves(boardState, currentPlayer) {
        var moves = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++){
                if (boardState[i][j].score < 3 && boardState[i][j].player != currentPlayer){
                    moves.push({row: i, column: j})
                }
            }
        }
      return moves;
    },

    drawBoardState(game) {
        const bs = game.boardState;
        for (var i = 0; i < bs.length; i++) {
            const line = _.map(bs[i], function(s) {
                if (s.player === 1){
                    return "x";
                } else if (s.player === 2){
                    return "o";
                } else {
                    return " "
                }
            });
            console.log(line.join('|'));

        }
    }

};

