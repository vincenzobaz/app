
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
  },

  API: {
    Users: {
      current: wrap('/api/user-info/'),
      details: function(id) {
        return url('/api/users/' + id + '/');
      }
    },

    Games: {
      list: wrap('/api/current-games/'),
      details: function(id) {
        return url('/api/games/' + id + '/');
      },
      start: wrap('/api/start-game/'),
      quit: wrap('/api/abort-game/'),
      demo: wrap('/api/demo/')
    },

    JoinRequests: {
      list: wrap('/api/join-requests/'),
      send: wrap('/api/join-requests/send/'),
      accept: wrap('/api/join-requests/accept/'),
      decline: wrap('/api/join-requests/decline/'),
    },

    Answers: {
      send: wrap('/api/answer/'),
      timeOut: wrap('/api/time-out')
    }
  }
};

module.exports = Routes;
