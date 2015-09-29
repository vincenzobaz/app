
'use strict';

Reminisce.Meteor = {
  call: Promise.promisify(Meteor.call, Meteor)
};

