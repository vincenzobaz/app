
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

  accept(joinRequest) {
    debug("accept() is not implemented");
    // Meteor.call('JoinRequest.accept', joinRequest.getId());
  },

  decline(joinRequest) {
    debug("decline() is not implemented");
    // Meteor.call('JoinRequest.decline', joinRequest.getId());
  },

  send(user) {
    debug("send() is not implemented");
    // Meteor.call('JoinRequest.send', user.getId());
  }

};

module.exports = JoinRequestStore;

