
function stringify(value) {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return value + '';
}

function querystring(props) {
  return Object.keys(props).map(key =>
    `${key}=${encodeURIComponent(stringify(props[key]))}`
  ).join('&');
}

// FIXME: Get rid of URL object.
function url(path) {
  return {
    url: path,
    toString: function() {
      return this.url;
    }
  };
}

function wrap(path) {
  return function() {
    return url(path);
  };
}

Reminisce.Routes = {
  Assets: {
    at: function(path) {
      return url('/' + (path + '').trim('/'));
    }
  },
  Facebook: {
    avatar: function(facebookId, query) {
      var qstr = query ? '?' + querystring(query) : '';
      return url(`https://graph.facebook.com/${facebookId}/picture${qstr}`);
    }
  }
};

