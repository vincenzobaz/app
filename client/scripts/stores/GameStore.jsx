
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
    return Games
            .find({}, { sort: { creationTime: -1 } })
            .fetch()
            .map(hydrate);
  },

  start(friendId) {
    return Reminisce.Store.JoinRequestStore.send(friendId);
  },

  startBotGame() {
    const bot = Reminisce.Store.FriendStore.bot();
    return Reminisce.Store.JoinRequestStore.send(bot.getId());
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
    if (isId) {
      GameSession.set('currentId', game);
    }
    else {
      GameSession.set('currentId', game._id);
    }

    Session.set('page', 'game');
  }

};

