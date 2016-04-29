
'use strict';

export function postJSON(url, data)
{
  var res = $.ajax({
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    type: 'POST',
    headers: {
      'X-CSRFToken': window['Reminisce_CSRFToken']
    }
  });
//FIXME: Not sure this will work
  return Promise.cast(res['promise']);
}



