
'use strict';

var Cortex = require('cortexjs');
var User = require('./models/User');

module.exports = new Cortex({
  user: new User({
    firstName: '',
    lastName: '',
    firstTime: false,
  }),
  currentGame: null,
  games: [],
  joinRequests: []
});
