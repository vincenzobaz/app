
function hydrate(user) {
  return new Reminisce.Model.User(user);
}

Reminisce.Store.UserStore = {

  isLoggedIn() {
    if (Meteor.userId() == null || Meteor.user() == null) {
      return false;
    }

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
  }

};

