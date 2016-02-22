
import {User} from './../models/User.jsx';

function hydrate(user) {
  return new User(user);
}

export const UserStore = {

  isLoggedIn() {
    if (Meteor.userId() == null || Meteor.user() == null) {
      return false;
    }
    
    return true;

    var user = Meteor.user();
    return user.services != null && user.services.facebook != null;
  },

  current() {
    if (!this.isLoggedIn()) {
      return null;
    }

    return hydrate(Meteor.user());
  },

  byId(id) {
    var user = Meteor.users.findOne(id);
    return hydrate(user);
  },

  byFacebookId(id) {
    var user = Meteor.users.findOne({'services.facebook.id': id});
    return hydrate(user);
  },

  hydrate(user) {
    return hydrate(user);
  }

};
