
'use strict';

var State = require('../AppState');
var getJSON = require('../helpers/getJSON');
var postJSON = require('../helpers/postJSON');
var JoinRequest = require('../models/JoinRequest');
var Routes = require('../Routes');
var debug = require('debug')('JoinRequestStore');

function _accept(id) {
  debug('Re-implement JoinRequestStore.accept');
  var url = Routes.API.JoinRequests.accept().url;
  return postJSON(url, {id: id});
}

function _decline(id) {
  debug('Re-implement JoinRequestStore.accept');
  var url = Routes.API.JoinRequests.decline().url;
  return postJSON(url, {id: id});
}

function _send(userId) {
  debug('Re-implement JoinRequestStore.accept');
  var url = Routes.API.JoinRequests.send().url;
  return postJSON(url, {userId: userId});
}

function _fetchAll() {
  debug('Re-implement JoinRequestStore.fetchAll');
  // var url = Routes.API.JoinRequests.list().url;
  var url = Routes.Assets.at('json/joinRequests.json');
  return getJSON(url);
}

function _hydrate(req) {
  return new JoinRequest(req);
}

function _refresh() {
  return _fetchAll().then(requests => {
    requests = requests.map(_hydrate);
    State.add('joinRequests', requests);
    return requests;
  });
}

var JoinRequestStore = {

  list() {
    return _refresh();
  },

  accept(id) {
    State.joinRequests.find(req => req.val().getId() === id).remove();
    return _accept(id).then(res => {
      _refresh();
      return res;
    });
  },

  decline(id) {
    State.joinRequests.find(req => req.val().getId() === id).remove();
    _decline(id).then(res => {
      _refresh();
      return res;
    });
  },

  send(userId) {
    return _send(userId);
  }

};

module.exports = JoinRequestStore;
