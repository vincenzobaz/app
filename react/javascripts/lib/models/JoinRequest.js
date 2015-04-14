
'use strict';

var merge = require('lodash.merge');
var lazy = require('../helpers/lazy');
var User = require('./User');
var UserStore = require('../stores/UserStore');

class JoinRequest {

  constructor(props) {
    merge(this, props);
  }

  getId() {
    return this._id;
  }

  getFrom() {
    return UserStore.byId(this._from);
  }

  getOpponent() {
    return this.getFrom();
  }

}

module.exports = JoinRequest;

