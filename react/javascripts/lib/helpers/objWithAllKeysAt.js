
'use strict';

module.exports = function objWithAllKeysAt(keys, value) {
  return keys.reduce((obj, key) => {
    obj[key] = value;
    return obj;
  }, {});
};

