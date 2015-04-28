
var GameSession = NamespacedSession('GameStore');
var Game = Reminisce.Model.Game;
var Games = Reminisce.Collection.Games;

function hydrate(game) {
  if (!(game instanceof Game)) {
    game = new Game(game);
  }
  return game;
}

Reminisce.Store.GameStore = {

  current() {
    var game = GameSession.get('current');
    if (game == null) {
      return game;
    }
    return hydrate(game);
  },

  list() {
    return Games.find().fetch().map(hydrate);
  },

  start(opponentId) {
    Reminisce.Store.JoinRequestStore.send(opponentId);
  },

  load(gameId) {
    var game = Games.findOne(gameId);
    return hydrate(game);
  },

  quit(game) {
    Meteor.call('Game.quit', game.getId(), () => {
      GameSession.set('current', null);
    });
  },

  switchTo(game, isId = true) {
    if (isId) {
      GameSession.set('current', this.load(game));
    }
    else {
      GameSession.set('current', game);
    }
  }

};

