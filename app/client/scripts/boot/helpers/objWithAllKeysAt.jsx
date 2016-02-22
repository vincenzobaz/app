
'use strict';

export function objWithAllKeysAt(keys, value) {
    keys.reduce((obj, key) => {
        obj[key] = value;
        return obj;
    }, {});
}

