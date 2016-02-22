import {GameStore} from './../stores/GameStore';


export class JoinRequest {

  constructor(props) {
    _.extend(this, props);
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
    return GameStore.byId(this.gameId);
  }

};

export const JoinRequests = new Mongo.Collection("joinRequests", {
  transform(doc) {
    return new JoinRequest(doc);
  }
});


