
import {User} from "../models/User";
export module UserStore {

  export function isLoggedIn() {
    if (Meteor.userId() == null || Meteor.user() == null) {
      return false;
    }
    
    var user = Meteor.user();
    return user.services != null && user.services.facebook != null;
  }

  export function current() {
    if (!this.isLoggedIn()) {
      return null;
    }

    const mUser = Meteor.user();
    return new User(mUser._id, mUser.username, mUser.services, mUser.profile);
  }

  export function byId(id) {
    return Meteor.users.findOne(id);
  }

  export function byFacebookId(id) {
    return Meteor.users.findOne({'services.facebook.id': id});
  }

}
