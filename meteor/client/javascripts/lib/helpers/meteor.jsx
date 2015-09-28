
'use strict';

module.exports = {
  call: Promise.promisify(Meteor.call, Meteor)
};

