
'use strict';

Reminisce.objWithAllKeysAt = (keys, value) =>
  keys.reduce((obj, key) => {
    obj[key] = value;
    return obj;
  }, {});

