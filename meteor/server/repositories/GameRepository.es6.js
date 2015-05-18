
GameRepository = {

  props: ['player1', 'player2',
          'player1Board', 'player2Board',
          'status', 'playerTurn',
          'player1Scores', 'player2Scores',
          'boardState'],

  save(game) {
    const doc = _.pick(game, ...this.props);
    if (game._id) {
      Games.update(game._id, doc);
    } else {
      game._id = Games.insert(doc);
    }

    return game._id;
  }

};

