
// FIXME: Get rid of URL object.
function url(path) {
  return {
    url: path,
    toString: function() {
      return this.url;
    }
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
      var qstr = query ? '?' + Querystring.encode(query) : '';
      return url(`https://graph.facebook.com/${facebookId}/picture${qstr}`);
    }
  }
};

