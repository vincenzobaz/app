
'use strict';

function postJSON(url, data)
{
  var res = $.ajax({
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    type: 'POST',
    headers: {
      'X-CSRFToken': window.Reminisce_CSRFToken
    }
  });

  return Promise.cast(res.promise());
}


module.exports = postJSON;

