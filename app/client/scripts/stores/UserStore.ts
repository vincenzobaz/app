
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

    return Meteor.user();
  }

  export function byId(id) {
    return Meteor.users.findOne(id);;
  }

  export function byFacebookId(id) {
    return Meteor.users.findOne({'services.facebook.id': id});
  }

}
