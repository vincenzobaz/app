
'use strict';

var JoinRequest = require('../models/JoinRequest');
var debug = require('debug')('JoinRequestStore');

function hydrate(req) {
  return new JoinRequest(req);
}

var JoinRequestStore = {

  list() {
    return JoinRequests.find().fetch().map(hydrate);
  },

  accept(id) {
    debug("accept() is not implemented");
  },

  decline(id) {
    debug("decline() is not implemented");
  },

  send(userId) {
    debug("send() is not implemented");
  }

};

module.exports = JoinRequestStore;

