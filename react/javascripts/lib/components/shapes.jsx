
'use strict';

var React = require('react');
var objWithAllKeysAt = require('../helpers/objWithAllKeysAt');
var Game = require('../models/Game');
var User = require('../models/User');
var Tile = require('../models/Tile');
var Question = require('../models/Question');
var JoinRequest = require('../models/JoinRequest');
var EventEmitter = require('events').EventEmitter;

var tile   = React.PropTypes.instanceOf(Tile);
var game   = React.PropTypes.instanceOf(Game);
var user   = React.PropTypes.instanceOf(User);
var friend = React.PropTypes.instanceOf(Friend);
var joinRequest = React.PropTypes.instanceOf(JoinRequest);
var question = React.PropTypes.instanceOf(Question);

var score = React.PropTypes.shape({
  me: React.PropTypes.number.isRequired,
  them: React.PropTypes.number.isRequired
});

var choice = React.PropTypes.shape({
  text: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
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

module.exports = {
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
  modalDesc: modalDesc
};

