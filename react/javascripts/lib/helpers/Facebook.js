
'use strict';

/*jshint -W079 */
var Promise = require('bluebird'),
    debug = require('debug')('Facebook');

module.exports = {

  api(url) {
    return new Promise(function(resolve, reject) {
      FB.api(url, function(res) {
        if (res.error) {
          reject(res.error);
        }
        else {
          resolve(res);
        }
      });
    });
  },

  init() {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : '163998950420801',
        xfbml      : true,
        version    : 'v2.1'
      });

      FB.login(() => {
        debug('logged in');
      }, {
        scope: 'user_friends'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  },

  fetchFriendsList() {
    return this.api('/me/friends');
  },

  getFriends() {
    if (this.friends != null) {
      return Promise.resolve(this.friends);
    }

    return this.fetchFriendsList().then(friends => {
      this.friends = friends.data;
      return friends.data;
    });
  },

  users: {},

  getUserInfo(userId) {
    if (this.users.hasOwnProperty(userId)) {
      return Promise.resolve(this.users[userId]);
    }

    return this.api('/' + userId).then(userInfo => {
      this.users[userId] = userInfo;
      return userInfo;
    });
  },

  avatars: {},

  getAvatar(facebookId) {
    if (this.avatars.hasOwnProperty(facebookId)) {
      return Promise.resolve(this.avatars[facebookId]);
    }

    return this.api(`/${facebookId}/picture`, {
      redirect: false,
      type: 'square'
    }).then(picture => {
      var url = picture.data.url;
      this.avatars[facebookId] = url;
      return url;
    });
  }

};
