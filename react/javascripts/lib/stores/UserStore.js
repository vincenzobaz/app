
'use strict';

var State = require('../AppState');
var getJSON = require('../helpers/getJSON');
var Routes = require('../Routes');
var User = require('../models/User');
var Promise = require('bluebird');
var debug = require('debug')('UserStore');

function _fetchCurrent() {
  debug('TODO: Re-implement UserStore.fetchCurrent');
  // var url = Routes.API.Users.current().url;
  var url = Routes.Assets.at('json/userInfo.json');
  return getJSON(url)
}

function _setUser(user) {
  State.add('user', user);
}

function _fetchById(id) {
  debug('TODO: Re-implement UserStore.fetchById');
  // var url = Routes.Users.details(id).url;
  var url = Routes.Assets.at(`json/users/${id}.json`);
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
