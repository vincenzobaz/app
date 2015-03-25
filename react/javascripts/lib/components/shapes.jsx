
'use strict';

var React = require('react');
var Game = require('../models/Game');
var User = require('../models/User');
var Tile = require('../models/Tile');
var Question = require('../models/Question');
var JoinRequest = require('../models/JoinRequest');

var score = React.PropTypes.shape({
  me: React.PropTypes.number.isRequired,
  them: React.PropTypes.number.isRequired
});

var tile = React.PropTypes.instanceOf(Tile);

// var tile = React.PropTypes.shape({
//   category: React.PropTypes.string.isRequired,
//   type: React.PropTypes.string.isRequired,
//   icon: React.PropTypes.string.isRequired,
//   score: score
// });

var fullGame = React.PropTypes.instanceOf(Game);
var game = fullGame;

// var fullGame = React.PropTypes.shape({
//   id: React.PropTypes.string.isRequired,
//   waiting: React.PropTypes.bool.isRequired,
//   score: score.isRequired,
//   tiles: React.PropTypes.arrayOf(tile).isRequired
// });

// var game = React.PropTypes.shape({
//   id: React.PropTypes.number.isRequired,
//   waiting: React.PropTypes.bool.isRequired,
//   score: score.isRequired
// });

var choice = React.PropTypes.shape({
  text: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  propType: React.PropTypes.string,
  icon: image
});

var image = React.PropTypes.shape({
  url: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number
});

var user = React.PropTypes.instanceOf(User);

// var user = React.PropTypes.shape({
//   id: React.PropTypes.string,
//   firstName: React.PropTypes.string.isRequired,
//   lastName: React.PropTypes.string.isRequired,
//   getFullName: React.PropTypes.func.isRequired,
//   getAvatarUrl: React.PropTypes.func.isRequired,
//   trainingStatus: React.PropTypes.string,
//   firstTime: React.PropTypes.bool
// });

var joinRequest = React.PropTypes.instanceOf(JoinRequest);

// var joinRequest = React.PropTypes.shape({
//   from: user
// });


var question = React.PropTypes.shape(Question);

// var question = React.PropTypes.shape({
//   type: React.PropTypes.string.isRequired,
//   answered: React.PropTypes.bool.isRequired,
//   data: React.PropTypes.object.isRequired
// });

var post = React.PropTypes.shape({
  type: React.PropTypes.string.isRequired,
  text: React.PropTypes.string,
  comment: React.PropTypes.string,
  picture: image
});

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

module.exports = {
  tile: tile,
  game: game,
  fullGame: fullGame,
  score: score,
  choice: choice,
  user: user,
  joinRequest: joinRequest,
  question: question,
  post: post,
  image: image,
  map: map,
  answer: answer
};
