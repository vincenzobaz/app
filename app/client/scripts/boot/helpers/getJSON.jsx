
'use strict';

export function getJSON(url, data)
{
  var promise = $.getJSON(url, data).promise();
  return Promise.cast(promise);
}
