
import { MeteorUser } from '../MeteorUser';

export const JoinRequestProps = ['_id', 'from', 'to', 'gameId'];

export interface RawJoinRequest {
  _id: string | Mongo.ObjectID;
  from: string;
  to: string;
  gameId: Mongo.ObjectID | string;
  requestIds: string[];
}

export default class JoinRequest implements RawJoinRequest {

  constructor(public _id: string | Mongo.ObjectID, 
              public from: string, 
              public to: string, 
              public gameId: Mongo.ObjectID | string,
              public requestIds: string[]) {
  }
  
  public getTo(): MeteorUser {
    return Meteor.users.findOne({'services.facebook.id': this.to});
  }
  
  public getFrom(): MeteorUser {
    return Meteor.users.findOne({'services.facebook.id': this.from});
  }
  
  static fromRaw(raw: RawJoinRequest) {
    return new JoinRequest(raw._id, raw.from, raw.to, raw.gameId, raw.requestIds);
  }

}

