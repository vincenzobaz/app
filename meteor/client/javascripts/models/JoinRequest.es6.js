
Reminisce.Model.JoinRequest = class JoinRequest {

  constructor(props) {
    _.extend(this, props);
  }

  getId() {
    return this._id;
  }

  getFrom() {
    return Reminisce.Store.UserStore.byId(this.from);
  }

  getOpponent() {
    return this.getFrom();
  }

  getGame() {
    return Reminisce.Store.GameStore.byId(this.gameId);
  }

}

Reminisce.Collection.JoinRequests = new Mongo.Collection("joinRequests", {
  transform(doc) {
    return new Reminisce.Model.JoinRequest(doc);
  }
});

