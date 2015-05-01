
GameRepository = {

  save(game) {
      var doc = _.pick(game, 'player1', 'player2',
      'player1Board', 'player2Board', 'status',
      'playerTurn', 'player1Scores', 'player2Scores');
    if (game._id) {
      Games.update(game._id, {$set: doc});
    } else {
      game._id = Games.insert(doc);
    }

    return game._id;
  }

};

