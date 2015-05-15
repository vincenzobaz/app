
'use strict';

const moment = require('moment');

const agoToDate = (time, unit, format = 'ddd Do MMMM YYYY') => {
  return moment().subtract(time, unit).format(format);
};

const dateToAgo = (date, unit) => {
  return moment().diff(date, unit);
};

module.exports = {
  agoToDate,
  dateToAgo
};

