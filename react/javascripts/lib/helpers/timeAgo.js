
'use strict';

var moment = require('moment');

module.exports = (time, unit, format = 'ddd Do MMMM YYYY') => {
  return moment().subtract(time, unit).format(format);
};

