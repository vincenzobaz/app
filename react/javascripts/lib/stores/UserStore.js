
'use strict';

var State = require('../AppState');
var getJSON = require('../helpers/getJSON');
var Routes = require('../Routes');
var User = require('../models/User');

function _fetchCurrent() {
  var url = Routes.API.Users.current().url;
  return getJSON(url);
}

function _setUser(user) {
  State.add('user', user);
}

function _fetchById(id) {
  var url = Routes.Users.details(id).url;
  return getJSON(url);
}

var UserStore = {

  fetchCurrent() {
    return _fetchCurrent().then(user => {
      user = new User(user);
      _setUser(user);
      return user;
    });
  },

  fetchById(id) {
    return _fetchById(id).map(user => new User(user));
  }

};

module.exports = UserStore;
