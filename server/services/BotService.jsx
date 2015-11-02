
BotService = {

    bots() {
        return BotService.getBots();
    },

    getBots() {
        return Meteor.users.find({username: {$in: ["bot1"]}}).fetch();
    },

    getBot() {
      return BotService.getBots()[0];
    },

    isBot(userId) {
      return BotService.getBots().map(bot => bot._id).indexOf(userId) > -1;
    },

    botsAsFriends() {
        return [this.getBot()].map(bot => ({
            name: bot.profile.name,
            id: bot._id,
            isBot: true
        }));
    },

    botsCreated() {
        return BotService.bots().length >= 1;
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
        const bot = BotService.getBot();

        const query = Games.find(
            {$and:
                [{$or:
                    [{player1: bot._id}, {player2: bot._id}]},
                    {status:
                    {$in: [GameStatus.Playing, GameStatus.Creating, GameStatus.Waiting]}}]
            });

        const handle = query.observe({
            added(game) {
                console.log(`Starting to observe game ${game._id}`);

                BotService.observeGame(game._id, bot._id);

                const request = JoinRequests.findOne({gameId: game._id});
                if (request) {
                    JoinRequestService.accept(request._id);
                    console.log(`Bot #1 accepted join request ${request._id}.`);
                }
            },

            removed(game) {
                console.log(`Game ${game._id} that bot #1 was playing has been removed.`);
            }
        });
    },

    createBotGame(strategy) {
        console.log("Creating bot game");

        const [bot1, bot2] = BotService.getBots();
        const result       = JoinRequestService.send(bot1._id, bot2._id);
        const game         = JoinRequestService.accept(result.requestId);

        GameService.start(game._id);
    },

    observeGame(gameId, botId) {
        const TIMEOUT = 3 * 1000;

        const query   = Games.find(gameId);
        const game    = Games.findOne(gameId);
        const botTurn = game.player1 === botId ? 1 : 2;
        const handle  = query.observe({
          changed(newGame, oldGame) {
            if (newGame.playerTurn === botTurn) {
              setTimeout(Meteor.bindEnvironment(() => {
                BotService.onGameChanged(newGame, handle);
              }), TIMEOUT);
            }
          }
        });
    },

    onGameChanged(game, handle) {
      if (game.status === GameStatus.Ended || game.status === GameStatus.Waiting) {
        return;
      }

      const result = BotService.playTurn(game);
      console.log("Results for bot turn:", result);

      BotService.drawBoardState(Games.findOne(game._id));

      if (result.win || result.draw) {
        handle.stop();
        console.log(`Game ended. Won: ${result.win}. Draw: ${result.draw}.`);
      }
    },

    playTurn(game) {
        if (game.getStatus() !== GameStatus.Playing) {
          return;
        }

        var boardId;
        var answers;
        var player;
        var firstTurn = false;
        if (game.getPlayerTurn() == 1) {
            boardId = "player1Board";
            player = game.player1;
            if (game.getPlayer1AvailableMoves().length === 9) {
                firstTurn = true;
            }
        } else {
            boardId = "player2Board";
            player = game.player2;
            if (game.getPlayer2AvailableMoves().length === 9) {
                firstTurn = true;
            }
        }

        const gameBoard   = GameBoards.findOne(game[boardId]);
        const method      = (firstTurn) ? 'pickRandom' : 'pickTile';
        const tile        = BotService[method](game, gameBoard);
        const successrate = 66;

        if (!tile) {
          throw new Meteor.Error(500, "Bot could't find a tile to play on.");
        }

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

        if (result.move == null) {
          return null;
        }

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
        const boardStateService = new BoardStateService(boardState, currentPlayer);

        if (boardStateService.playerWins()) {
            return 10 - depth;
        }

        if (boardStateService.playerWins((currentPlayer % 2) + 1)) {
            return depth - 10;
        }

        return 0;
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
            console.log('|' + line.join('|') + '|');
        }
    }

};

