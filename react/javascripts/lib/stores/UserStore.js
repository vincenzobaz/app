
'use strict';

var User = require('../models/User');
var debug = require('debug')('UserStore');

function hydrate(user) {
  return new User(user);
}

var UserStore = {

  current() {
    var user = Users.findOne({firstName: 'Romain'});
    return hydrate(user);
  },

  byId(id) {
    var user = Users.findOne(id);
    return hydrate(user);
  }

};

module.exports = UserStore;

