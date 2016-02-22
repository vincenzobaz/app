

import user = Accounts.user;
import {Routes} from "../Routes";

interface  RawFriend {
    _id: string;
    userId: string;
    facebookId: string;
    name: string;
    friendOf: string;
    isBot: boolean;
}

export class Friend {
    
    private _id: string;
    private _userId: string;
    private _facebookId: string;
    private _name;
    private _friendOf: string;
    private _isBot: boolean;

    constructor(_id: string, userId: string, facebookId: string, name: string, friendOf: string, isBot: boolean) {
        this._id = _id;
        this._userId = userId;
        this._facebookId = facebookId;
        this._name = name;
        this._friendOf = friendOf;
        this._isBot = isBot;
    }

    get id() {
        return this._id;
    }
  
    get userId() {
        return this._userId;
    }
  
    hasUserId() {
      return this.userId != null;
    }
  
    get facebookId() {
        return this._facebookId;
    }
  
    get name() {
        return this._name;
    }
  
    get friendOf() {
        return this._friendOf;
    }
  
    get isBot() {
        return !!this._isBot;
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
