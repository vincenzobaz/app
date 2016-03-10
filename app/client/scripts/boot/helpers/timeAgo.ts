
'use strict';

const moment = require('moment');

export const agoToDate = (from, ago, unit, format = 'ddd Do MMMM YYYY') => {
  return moment(from).subtract(ago, unit).format(format);
};

export const dateToAgo = (date, unit) => {
  return moment().diff(date, unit);
};

