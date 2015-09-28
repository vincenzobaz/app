
Reminisce.Model.JoinRequest = class JoinRequest {

  constructor(props) {
    Object.assign(this, props);
  }

  getId() {
    return this._id;
  }

  getFrom() {
    return Friends.findOne({userId: this.from});
  }

  getOpponent() {
    return this.getFrom();
  }

  getGame() {
    return Reminisce.Store.GameStore.byId(this.gameId);
  }

};

Reminisce.Collection.JoinRequests = new Mongo.Collection("joinRequests", {
  transform(doc) {
    return new Reminisce.Model.JoinRequest(doc);
  }
});

