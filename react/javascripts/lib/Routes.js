
'use strict';

var querystring = require('querystring');

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

var Routes = {
  Home: {
    index: wrap('/home/')
  },

  About: {
    index: wrap('/about/')
  },

  Assets: {
    at: function(path) {
      return url('/' + (path + '').trim('/'));
    }
  },
  Facebook: {
    avatar: function(facebookId, query) {
      var qstr = query ? '?' + querystring.stringify(query) : '';
      return url(`https://graph.facebook.com/${facebookId}/picture${qstr}`);
    }
  }
};

module.exports = Routes;
