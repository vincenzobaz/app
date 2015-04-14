
'use strict';

var User = require('../models/User');
var debug = require('debug')('UserStore');

function hydrate(user) {
  return new User(user);
}

var UserStore = {

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

    var user = Meteor.user();
    return hydrate(user);
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

module.exports = UserStore;

