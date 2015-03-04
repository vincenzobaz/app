
'use strict';

module.exports = function lazy(obj, prop, cons) {
  var _prop = '_' + prop;
  if (obj[_prop] == null) {
    obj[_prop] = cons(obj[prop]);
  }
  return obj[_prop];
};

