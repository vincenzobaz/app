
'use strict';

var propAtPath = require('./propAtPath');

module.exports = (state) => () => {
  return propAtPath(state, 'currentGame.token', '');
};

