
'use strict';

var merge = _.extend;
var EventEmitter = require('events').EventEmitter;
var ErrorStore = merge(EventEmitter.prototype, {

  register() {
    // window.onerror = this.onGlobalError.bind(this);
    Promise.onPossiblyUnhandledRejection(this.onPromiseError.bind(this));
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

Reminisce.ErrorStore = ErrorStore;
