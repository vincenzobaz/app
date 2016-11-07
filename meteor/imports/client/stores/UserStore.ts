
import { User } from '../models/User';

export module UserStore {

  export function isLoggedIn(): boolean {
    if (Meteor.userId() == null || Meteor.user() == null) {
      return false;
    }

    const user = Meteor.user();

    return user.services != null && user.services.facebook != null;
  }

  export function current(): User {
    if (!this.isLoggedIn()) {
      return null;
    }

    const user = Meteor.user();

    return new User(
      user._id,
      user.username,
      user.services,
      user.profile
    );
  }

  export function byId(id): Meteor.User {
    return Meteor.users.findOne(id);
  }

  export function byFacebookId(id): Meteor.User {
    return Meteor.users.findOne({'services.facebook.id': id});
  }

}

