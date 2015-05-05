
// Code adapted from
// http://www.html5rocks.com/en/tutorials/pagevisibility/intro/

'use strict';

var EventEmitter = require('events').EventEmitter,
    util = require('util');

function getHiddenProp() {
  var prefixes = ['webkit', 'moz', 'ms', 'o'];

  // if 'hidden' is natively supported just return it
  if ('hidden' in document) {
    return 'hidden';
  }

  // otherwise loop over all the known prefixes until we find one
  for (var i = 0; i < prefixes.length; i += 1) {
    if ((prefixes[i] + 'Hidden') in document) {
      return prefixes[i] + 'Hidden';
    }
  }

  // otherwise it's not supported
  return null;
}

function PageVisibility() {
  var prop = getHiddenProp();
  if (prop) {
    var eventName = prop.replace(/[H|h]idden/, '') + 'visibilitychange';
    document.addEventListener(eventName, this.onVisibilityChange.bind(this));
  }
}

util.inherits(PageVisibility, EventEmitter);

PageVisibility.prototype.isHidden = function isHidden() {
  var prop = getHiddenProp();
  if (!prop) {
    return false;
  }
  return document[prop];
};

PageVisibility.prototype.onVisibilityChange = function onVisibilityChange() {
  this.emit('change');
};

module.exports = PageVisibility;

