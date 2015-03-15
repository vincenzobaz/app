
'use strict';

var EventEmitter = require('events').EventEmitter;
var merge = require('lodash.merge');
// var Bluebird = require('bluebird'); 
var ErrorStore = merge(EventEmitter.prototype, {

  register() {
    // window.onerror = this.onGlobalError.bind(this);
    // Bluebird.onPossiblyUnhandledRejection(this.onPromiseError.bind(this));
  },

  emitTurnError(error) {
    this.emit('error', {
      type: 'Turn',
      error: error
    });
  },

  emitError(error) {
    this.emit('error', {
      type: 'Generic',
      error: error
    });
  },

  onGlobalError(msg, url, line, col, error) {
    this.emitError(error);
  },

  onPromiseError(error) {
    this.emit('error', {
      type: 'Network',
      error: error
    });
  }

});

module.exports = ErrorStore;
