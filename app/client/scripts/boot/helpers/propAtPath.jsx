
'use strict';

export function propAtPath(obj, path, defValue) {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  if (path.length === 0) {
    return obj;
  }

  if (obj.hasOwnProperty(path[0])) {
    return propAtPath(obj[path[0]], path.slice(1), defValue);
  }

  return defValue;
}


