
Reminisce.Model.JoinRequest = class JoinRequest {

  constructor(props) {
    _.extend(this, props);
  }

  getId() {
    return this._id;
  }

  getFrom() {
    return Reminisce.Store.UserStore.byId(this._from);
  }

  getOpponent() {
    return this.getFrom();
  }

}

Reminisce.Collection.JoinRequests = new Mongo.Collection("joinRequests", {
  transform(doc) {
    console.log('JoinRequest', doc);
    return new Reminisce.Model.JoinRequest(doc);
  }
});

