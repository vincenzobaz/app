
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
        var query1 = Games.find(
            {$and:
                [{$or:
                    [{player1: bot1._id}, {player2: bot1._id}]},
                    {status:
                    {$in: [GameStatus.Playing, GameStatus.Creating, GameStatus.Waiting]}}]
            });

        var handle1 = query1.observe({
            added: function (game) {
                console.log(`Starting to observe game ${game._id}`);
                BotService.observeGame(game._id, bot1._id);
                const request = JoinRequests.findOne({gameId: game._id});
                if (request) {
                    JoinRequestService.accept(request._id);
                }
            },
            removed: function (id) {
                console.log("it removed");
            }
        });

        var query2 = Games.find(
            {$and:
                [{$or:
                    [{player1: bot2._id}, {player2: bot2._id}]},
                    {status: {$in: [GameStatus.Playing, GameStatus.Creating, GameStatus.Waiting]}}]
            });

        var handle2 = query2.observe({
            added: function(game) {
                BotService.observeGame(game._id, bot2._id);
            },
            removed: function(id) {
                console.log(`it removed`);
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
                        if (newGame.status !== GameStatus.Ended && newGame.status !== GameStatus.Waiting) {
                            const result = BotService.playTurn(newGame);
                            console.log("results for bot turn");
                            console.log(result);
                            BotService.drawBoardState(Games.findOne(newGame._id));

                            if (result.win || result.draw) {
                                handle1.stop();
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
        var firstTurn = false;
        if (game.getPlayerTurn() == 1) {
            console.log("Bot1 playing");
            boardId = "player1Board";
            player = game.player1;
            if (game.getPlayer1AvailableMoves().length === 9) {
                firstTurn = true;
            }
        } else {
            console.log("Bot2 playing");
            boardId = "player2Board";
            player = game.player2;
            if (game.getPlayer2AvailableMoves().length === 9) {
                firstTurn = true;
            }
        }

        const gameBoard = GameBoards.findOne(game[boardId]);
        const tile = firstTurn? BotService.pickRandom(game, gameBoard) : BotService.pickTile(game, gameBoard);

        //const tile = BotService.pickTile(game, gameBoard);
        const successrate = 66;

        answers = _.map(tile.getQuestions(), q => {
            switch (q.kind) {
                case Question.Kind.Timeline:
                    return new TimelineAnswer(
                        new TimelineData(_.random(0, 100) < successrate ? q.answer: q.default)
                    );
                    break;
                case Question.Kind.MultipleChoice:
                    return new MultipleChoiceAnswer(
                        new MultipleChoiceData(_.random(0, 100) < successrate ? q.answer: q.answer + 1 % 4)
                    );
                    break;
                case Question.Kind.Geolocation:
                    const geoAnswer = new GeoAnswer(
                        //new GeoData(new Marker(0, 0))
                        new GeoData(_.random(0, 100) < successrate ? q.getAnswer(): new Marker(0, 0))
                    );
                    return geoAnswer;
                    break;
                case Question.Kind.Order:
                    const correctOrder = new OrderData(
                        [new OrderItem(q.answer[0], ""),
                            new OrderItem(q.answer[1], ""),
                            new OrderItem(q.answer[2], ""),
                            new OrderItem(q.answer[3], "")
                        ]);
                    const incorrectOrder = new OrderData(
                        [new OrderItem(0, ""),
                            new OrderItem(0, ""),
                            new OrderItem(0, ""),
                            new OrderItem(0, "")
                        ]);
                    return new OrderAnswer(0, _.random(0, 100) < successrate? correctOrder: incorrectOrder);
                break;
                default:
                    throw new Meteor.Error(500, `Unknown Question Kind ${q.kind} for Bot`);
            }
        });
        return AnswerService.post(player, game._id, tile._id, answers);

    },

    pickTile(game, gameBoard) {
        const tiles = gameBoard.getTiles();
        const result = BotService.minmax(game, game.getPlayerTurn(), 0);
        return tiles[result.move.row * 3 + result.move.column];

    },

    pickRandom(game, gameBoard) {
        const tiles = gameBoard.getTiles();

        const indexTiles = _.zip(_.range(9), _.flatten(game.boardState));

        const potentialTiles = _.filter(indexTiles, function (t) {
            return t[1].player === 0
        });
        if (potentialTiles.length > 0) {
            return tiles[_.sample(potentialTiles)[0]];
        } else {
            return _.sample(tiles);
        }
    },

    minmax(game, player, depth) {
        const score = BotService.score(game.boardState, player, depth);
        if (score !== 0){
            return {move: null, score: score};
        }
        depth += 1;
        var scores = [];
        var moves = [];

        const possibilities = BotService.getAvailableMoves(game, game.getPlayerTurn());
        //console.log("possibilities: ", possibilities);
        if (_.isEmpty(possibilities)){
            return {move: null, score: 0};
        }
        _.forEach(possibilities, m => {
            const updatedGame = game.createCopy();
            BotService.makeMove(updatedGame, m, game.getPlayerTurn());
            scores.push(BotService.minmax(updatedGame, player, depth).score);
            moves.push(m);
        });

        if (game.getPlayerTurn() === player){
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
        game.setPlayer1AvailableMoves(_.filter(game.getPlayer1AvailableMoves(), m => {return m.row !== move.row || m.column !== move.column}));
        game.setPlayer2AvailableMoves(_.filter(game.getPlayer2AvailableMoves(), m => {return m.row !== move.row || m.column !== move.column}));
        game.boardState[move.row][move.column] = {player: player, score: 3};
        game.setPlayerTurn((player  % 2) + 1);
    },

    score(boardState, currentPlayer, depth) {
        if (AnswerService.playerWins(boardState, currentPlayer)){
            return 10 - depth;
        } else if (AnswerService.playerWins(boardState, (currentPlayer  % 2) + 1)){
            return depth - 10;
        } else {
            return 0;
        }
    },

    getAvailableMoves(game, currentPlayer) {
        if (currentPlayer == 1){
            return game.getPlayer1AvailableMoves();
        } else {
            return game.getPlayer2AvailableMoves();
        }
    },


    drawBoardState(game) {
        const bs = game.boardState;
        for (var i = 0; i < bs.length; i++) {
            const line = _.map(bs[i], function(s) {
                if (s.player === 1){
                    return s.score === 0? '-' : "x";
                } else if (s.player === 2){
                    return s.score === 0? '-' : "o";
                } else {
                    return " "
                }
            });
            console.log(line.join('|'));

        }
    }

};
