import {Friend} from '../../../common/models/Friend';
import {Friends} from '../../../common/collections/Friends';

export module FriendStore {

  export function byId(id): Friend {
    return Friends.findOne(id);
  }

  export function byUserId(userId): Friend {
    return Friends.findOne({userId: userId});
  }

  export function byFacebookId(facebookId): Friend {
    return Friends.findOne({facebookId: facebookId});
  }

  export function list(): Friend[] {
    return Friends.find().fetch();
  }

  export function friendsWithUserId(): Friend[] {
    return Friends.find({userId: {$ne: null}}).fetch();
  }
  
  export function bot(): Friend {
    return Friends.findOne({isBot: true});
  }
}
;

