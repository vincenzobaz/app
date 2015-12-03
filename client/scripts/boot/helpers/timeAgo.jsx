
'use strict';

const moment = require('moment');

const agoToDate = (from, ago, unit, format = 'ddd Do MMMM YYYY') => {
  return moment(from).subtract(ago, unit).format(format);
};

const dateToAgo = (date, unit) => {
  return moment().diff(date, unit);
};

Reminisce.Time = {
  agoToDate,
  dateToAgo
};

