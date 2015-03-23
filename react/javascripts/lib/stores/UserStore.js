
'use strict';

var User = require('../models/User');
var debug = require('debug')('UserStore');

function hydrate(user) {
  return new User(user);
}

var UserStore = {

  isLoggedIn() {
    return Meteor.userId() != null;
  },

  current() {
    if (!this.isLoggedIn()) {
      return null;
    }
    var user = Meteor.user();
    return hydrate(user);
  },

  byId(id) {
    var user = Users.findOne(id);
    return hydrate(user);
  }

};

module.exports = UserStore;

