
'use strict';

var merge = require('lodash.merge');
var lazy = require('../helpers/lazy');
var User = require('./User');

class JoinRequest {

  constructor(props) {
    merge(this, props);
  }

  getId() {
    return this.id;
  }

  getFrom() {
    return lazy(this, 'from', u => new User(u));
  }

  getOpponent() {
    return this.getFrom();
  }

}

module.exports = JoinRequest;

