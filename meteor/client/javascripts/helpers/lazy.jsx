
var cache = {};

lazy = (key, obj, prop, compute) => {
  if (cache[key] === undefined) {
    cache[key] = compute(obj[prop]);
  }
  return cache[key];
};

