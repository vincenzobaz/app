
'use strict';

import {objWithAllKeysAt} from './objWithAllKeysAt';

var React = require('react');
var EventEmitter = require('events').EventEmitter;

// var tile   = React.PropTypes.instanceOf(R.Tile);
// var game   = React.PropTypes.instanceOf(R.Game);
// var user   = React.PropTypes.instanceOf(R.User);
// var friend = React.PropTypes.instanceOf(R.Friend);
// var joinRequest = React.PropTypes.instanceOf(R.JoinRequest);
// var question = React.PropTypes.instanceOf(R.Question);

var tile        = React.PropTypes.shape({});
var game        = React.PropTypes.shape({});
var user        = React.PropTypes.shape({});
var friend      = React.PropTypes.shape({});
var joinRequest = React.PropTypes.shape({});
var question    = React.PropTypes.shape({});

var score = React.PropTypes.shape({
  me: React.PropTypes.number.isRequired,
  them: React.PropTypes.number.isRequired
});

var choice = React.PropTypes.shape({
  text: React.PropTypes.string.isRequired,
  value: React.PropTypes.any,
  fbId: React.PropTypes.string,
  pageId: React.PropTypes.string,
  icon: image
});

var image = React.PropTypes.shape({
  url: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number
});

var post = React.PropTypes.shape({
  type: React.PropTypes.string.isRequired,
  text: React.PropTypes.string,
  comment: React.PropTypes.string,
  picture: image
});

var subject = post;

var map = React.PropTypes.shape({
  latitude: React.PropTypes.number.isRequired,
  longitude: React.PropTypes.number.isRequired,
  zoom: React.PropTypes.number.isRequired,
  apiKey: React.PropTypes.string.isRequired,
  sensor: React.PropTypes.bool
});

var answer = React.PropTypes.shape({
  questionId: React.PropTypes.number.isRequired,
  data: React.PropTypes.object.isRequired,
  timeSpent: React.PropTypes.number.isRequired
});

var eventEmitter = React.PropTypes.shape(objWithAllKeysAt([
  'addListener', 'on', 'once', 'removeListener',
  'removeAllListeners', 'listeners', 'emit'
], React.PropTypes.func.isRequired));

var modalDesc = React.PropTypes.shape({
  element: React.PropTypes.any.isRequired,
  props: React.PropTypes.object.isRequired,
  onDismiss: React.PropTypes.func
});

var item = React.PropTypes.shape({
  text: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
  subject: subject.isRequired
});

let Shapes = {
  Tile: tile,
  Game: game,
  User: user,
  Friend: friend,
  JoinRequest: joinRequest,
  Question: question,
  score: score,
  choice: choice,
  post: post,
  subject: subject,
  image: image,
  map: map,
  answer: answer,
  EventEmitter: eventEmitter,
  modalDesc: modalDesc,
  item: item
};

module.exports = {
  Shapes: Shapes
};
