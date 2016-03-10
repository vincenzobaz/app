import {GameStore} from './../stores/GameStore';
import {Friends} from "../../../common/collections/Friends";
import {Friend} from "../../../common/models/Friend";
import {Game} from "./Game";

interface RawJoinRequest {
  _id: Mongo.ObjectID | string;
  fromId: Mongo.ObjectID | string;
  gameId: Mongo.ObjectID | string;
}

export class JoinRequest {

  constructor(public _id: Mongo.ObjectID | string,
  public fromId: Mongo.ObjectID | string,
  public gameId: Mongo.ObjectID | string) {

  }



  get from(): Friend {
    return Friends.findOne({userId: this.fromId});
  }

  getOpponent() {
    return this.from;
  }

  get game(): Game | {} {
    return GameStore.byId(this.gameId);
  }

};

export const JoinRequests = new Mongo.Collection("joinRequests", {
  transform(doc: RawJoinRequest) {
    return new JoinRequest(doc._id, doc.fromId, doc.gameId);
  }
});


