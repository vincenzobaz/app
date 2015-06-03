
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
    const gameId = GameSession.get('currentId');
    if (gameId == null) {
      return null;
    }
    return this.load(gameId);
  },

  list() {
    return Games.find().fetch().map(hydrate);
  },

  start(friendId) {
    return Reminisce.Store.JoinRequestStore.send(friendId);
  },

  load(gameId) {
    const game = Games.findOne(gameId);
    return hydrate(game);
  },

  quit(game) {
    Meteor.call('Game.quit', game.getId(), () => {
      GameSession.set('currentId', null);
      Session.set('page', 'home');
    });
  },

  switchTo(game, isId = true) {
    Session.set('page', 'game');

    if (isId) {
      GameSession.set('currentId', game);
    }
    else {
      GameSession.set('currentId', game._id);
    }
  }

};

