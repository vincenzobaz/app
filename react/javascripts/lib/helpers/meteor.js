
'use strict';

var Bluebird = require('bluebird');

module.exports = {
  call: Bluebird.promisify(Meteor.call, Meteor)
};

