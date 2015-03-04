
'use strict';

var getToken = require('./getToken');

module.exports = (state) => () => {
  var token = getToken(state)();
  return typeof token === 'string' && token !== '';
};

