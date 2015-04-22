
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

  start(opponent) {
    Meteor.call('Game.start', opponent.getId(), (id) => {
      GameSession.set('currentId', id);
      GameSession.set('current', this.load(id));
    });
  },

  load(id) {
    var game = Reminisce.Collection.Games.findOne(id).fetch();
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

