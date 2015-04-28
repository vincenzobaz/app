
GameRepository = {

  save(game) {
    var doc = _.pick(game, 'player1', 'player2',
      'player1Board', 'player2Board', 'status',
      'playerTurn', 'player1Scores', 'player2Scores');

    if (game.id) {
      Games.update(game.id, {$set: doc});
    } else {
      game.id = Games.insert(doc);
    }

    return game.id;
  }

};

