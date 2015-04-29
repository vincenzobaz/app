
lazy = (obj, prop, compute) => {
  var value;
  return () => {
    if (value === undefined) {
      value = compute(obj[prop]);
    }
    return value;
  };
}

