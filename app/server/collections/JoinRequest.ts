
import ObjectID = Mongo.ObjectID;
export const JoinRequestProps = ['_id', 'from', 'to', 'gameId'];

export interface RawJoinRequest {
  _id: ObjectID;
  from: string;
  to: string;
  gameId: string;
}

export default class JoinRequest implements RawJoinRequest {

  constructor(public _id: ObjectID, public from: string, public to: string, public gameId: string) {
  }
  
  static fromRaw(raw: RawJoinRequest) {
    return new JoinRequest(raw._id, raw.from, raw.to, raw.gameId);
  }

}
