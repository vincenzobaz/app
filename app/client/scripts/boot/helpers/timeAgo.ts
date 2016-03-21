
'use strict';
import {TimelineUnit} from "../../../../common/models/questions/TimelineUnit";

const moment = require('moment');

export const agoToDate = (from: string, ago: number, unit: TimelineUnit, format = 'ddd Do MMMM YYYY') => {
  return moment(from).subtract(ago, unit).format(format);
};

export const addUnitsToDate = (date: string, amount: number, unit: TimelineUnit ) => {
  return moment(date).add(amount, unit);
}

export const getDateString = (date, format = 'ddd Do MMMM YYYY') => {
  return moment(date).format(format);
};

/**
 * Returns how many units ago the date was compared to current date
 * Example Today: 10.1.2016, date: 3.1.2016, unit: "day"
 * would give 7
 * 
 * @param date
 * @param unit
 * @returns {number}
 */
export const dateToAgo = (date, unit) => {
  return moment().diff(date, unit);
};

