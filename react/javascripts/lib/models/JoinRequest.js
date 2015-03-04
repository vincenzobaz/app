
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
    return this.getOpponent();
  }

  getOpponent() {
    return lazy(this, 'opponent', op => new User(op));
  }

}

module.exports = JoinRequest;

