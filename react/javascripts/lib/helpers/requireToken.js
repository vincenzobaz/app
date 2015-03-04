
'use strict';

var getToken = require('./getToken');
var ErrorStore = require('../stores/ErrorStore');

module.exports = (state) => () => {
  var token = getToken(state)();

  if (token !== '') {
    return token;
  }

  ErrorStore.emitTurnError(new Error('No token available'));

  return null;
};

