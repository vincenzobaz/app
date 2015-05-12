
'use strict';

function getJSON(url, data)
{
  var promise = $.getJSON(url, data).promise();
  return Promise.cast(promise);
}

module.exports = getJSON;
