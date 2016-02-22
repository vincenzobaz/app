
'use strict';

export const MeteorPromise = {
  call: Promise.promisify(Meteor.call, Meteor)
};

