
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
    const id = joinRequest.getId && joinRequest.getId() || joinRequest;
    Meteor.call('JoinRequest.accept', id);
  },

  decline(joinRequest) {
    const id = joinRequest.getId && joinRequest.getId() || joinRequest;
    Meteor.call('JoinRequest.decline', id);
  },

  send(user) {
    const id = user.getId && user.getId() || user;
    Meteor.call('JoinRequest.send', id);
  }

};

module.exports = JoinRequestStore;

