

import user = Accounts.user;
import {Routes} from "../Routes";

interface  RawFriend {
    _id?: string | Mongo.ObjectID;
    userId: string;
    facebookId: string;
    name: string;
    friendOf: string;
    isBot: boolean;
}

export class Friend {
  
    constructor(public _id: string | Mongo.ObjectID,
                public userId: string | Mongo.ObjectID,
                public facebookId: string,
                public name: string,
                public friendOf: string,
                public isBot: boolean) {
    }
  
    get avatarUrl() {
        if (this.isBot) {
            return Routes.Assets.avatars.bot();
        } else if (this.facebookId != null) {
          return Routes.Assets.avatars.facebook(this.facebookId);
        }
  
        return Routes.Assets.avatars.default();
    }
  
  static fromRaw(data: RawFriend) {
    return new Friend(data._id, data.userId, data.facebookId, data.name, data.friendOf, data.isBot);
  }

}
