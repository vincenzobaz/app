
'use strict';

// Very OOP-ish, but good enough I guess.

var util = require('util'),
    debug = require('debug')('OperationScheduler'),
    PageVisibility = require('./PageVisibility');

function nop() {}

function ScheduleStrategy() {}

ScheduleStrategy.prototype = {
  lastOp       : nop,
  lastCallback : nop,

  schedule(op, callback) {
    this.lastOp       = op;
    this.lastCallback = callback;

    this.scheduleNextOperation(op, callback);
  },

  scheduleNextOperation(op, callback) {
    throw new Error('Please override ScheduleStrategy.scheduleNext.');
  },

  reset() {
    /* nop */
  },

  redoLast() {
    this.schedule(this.lastOp, this.lastCallback);
  }
};

function ExponentialBackoffSchedule(init /* ms */, factor) {
  this.timeout = init / factor;
  this.factor  = factor;
  this.timer   = null;
}

util.inherits(ExponentialBackoffSchedule, ScheduleStrategy);

ExponentialBackoffSchedule.prototype.scheduleNextOperation = function scheduleNextOperation(op, callback) {
  clearTimeout(this.timer);
  this.timeout *= this.factor;
  this.timer    = setTimeout(this.executeOperation.bind(this, op, callback), this.timeout);
  // debug('Executing op in ' + this.timeout + 'ms');
};

ExponentialBackoffSchedule.prototype.executeOperation = function executeOperation(op, callback) {
  op();
  callback();
};

function LinearSchedule(every /* ms */) {
  this.every = every;
  this.timer = null;
}

util.inherits(LinearSchedule, ScheduleStrategy);

LinearSchedule.prototype.scheduleNextOperation = function scheduleNextOperation(op, callback) {
  clearTimeout(this.timer);
  this.timer = setTimeout(this.executeOperation.bind(this, op, callback), this.every);
  // debug('Executing op in ' + this.every + 'ms');
};

LinearSchedule.prototype.executeOperation = function executeOperation(op, callback) {
  op();
  callback();
};

function BackgroundSchedule(whenVisible, whenHidden) {
  this.pageVisibility = new PageVisibility();
  this.whenVisible    = whenVisible;
  this.whenHidden     = whenHidden;

  this.pageVisibility.on('change', this.onVisibilityChange.bind(this));
}

util.inherits(BackgroundSchedule, ScheduleStrategy);

BackgroundSchedule.prototype.scheduleNextOperation = function scheduleNextOperation(op, callback) {
  return this.pageVisibility.isHidden() ? this.whenHidden.schedule(op, callback)
    : this.whenVisible.schedule(op, callback);
};

BackgroundSchedule.prototype.reset = function reset() {
  this.whenHidden.reset();
  this.whenVisible.reset();
};

BackgroundSchedule.prototype.onVisibilityChange = function onVisibilityChange() {
  this.reset();
  this.redoLast();
  // debug('visibility changed, isHidden =', this.pageVisibility.isHidden());
};

function OperationScheduler(op, strategy, callback) {
  this.stopped  = true;
  this.op       = op;
  this.strategy = strategy;
  this.callback = callback || nop;
}

OperationScheduler.prototype = {

  start() {
    debug('will start refreshing');
    this.stopped = false;
    this._execute();
  },

  stop() {
    debug('will stop refreshing');
    this.stopped = true;
  },

  reset() {
    debug('resetting')
    this.strategy.reset();
  },

  _execute() {
    if (this.isStopped()) {
      debug('stopped, won\'t execute');
      return;
    }
    debug('will execute op');
    this.strategy.schedule(this.op, this.onExecuted.bind(this));
  },

  onExecuted() {
    this._execute();
    this.callback();
  },

  isStopped() {
    return this.stopped;
  }

};

module.exports = {
  ScheduleStrategy           : ScheduleStrategy,
  ExponentialBackoffSchedule : ExponentialBackoffSchedule,
  LinearSchedule             : LinearSchedule,
  BackgroundSchedule         : BackgroundSchedule,
  OperationScheduler         : OperationScheduler
};

