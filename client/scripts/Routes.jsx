
// FIXME: Get rid of URL object.
function url(path) {
  return {
    url: path,
    toString() {
      return this.url;
    }
  };
}

Reminisce.Routes = {
  Assets: {
    at(path) {
      return url('/' + (path + '').trim('/'));
    },
    avatars: {
      default() {
        return url('images/avatar-default.png');
      },
      bot() {
        return url('images/bot-avatar.png');
      },
      facebook(facebookId, query = '') {
        var qstr = query ? '?' + Querystring.encode(query) : '';
        return url(`https://graph.facebook.com/${facebookId}/picture${qstr}`);
      }
    }
  },
  Facebook: {
    avatar(facebookId, query) {
      return Reminisce.Routes.Assets.avatars.facebook(facebookId, query);
    }
  }
};

