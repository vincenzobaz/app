
var GameSession = NamespacedSession('GameStore');

function hydrate(game) {
  return new Reminisce.Model.Game(game);
}

Reminisce.Store.GameStore = {

  currentId() {
    return GameSession.get('currentId');
  },

  current() {
    return GameSession.get('current');
  },

  list() {
    return Reminisce.Collection.Games.find().fetch().map(hydrate);
  },

  start(opponentId) {
    Reminisce.Store.JoinRequestStore.send(opponentId);
  },

  load(gameId) {
    var game = Reminisce.Collection.Games.findOne(gameId);
    return hydrate(game);
  },

  quit(game) {
    Meteor.call('Game.quit', game.getId(), () => {
      GameSession.set('currentId', null);
      GameSession.set('current', null);
    });
  },

  switchTo(gameId, isId = true) {
    if (isId) {
      GameSession.set('currentId', gameId);
    }
    else {
      GameSession.set('current', gameId);
    }
  }

};

