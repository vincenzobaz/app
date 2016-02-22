// http://underscorejs.org/docs/underscore.html

function createPredicateIndexFinder(dir) {
  return function(array, predicate, context) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }
    return -1;
  };
}

export const findIndex = createPredicateIndexFinder(1);

