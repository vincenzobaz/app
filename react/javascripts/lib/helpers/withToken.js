
'use strict';

var requireToken = require('./requireToken');

module.exports = (state) => (obj) => {
  obj.token = requireToken(state)();
  return obj;
};
