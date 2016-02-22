
import {trim} from 'lodash';
import {encode} from 'querystring'

export const Routes = {
  Assets: {
    at(path) {
      //FIXME: Most likely this needs to be fixed
      console.log('/' + trim(path + '', '/'));
      return '/' + trim(path + '', '/');
    },
    avatars: {
      default() {
        return 'images/avatar-default.png';
      },
      bot() {
        return 'images/bot-avatar.png';
      },
      facebook(facebookId, query = ''): string {
        var qstr = query ? '?' + encode(query): '';
        return `https://graph.facebook.com/${facebookId}/picture${qstr}`;
      }
    }
  },
  Facebook: {
    avatar(facebookId, query) {
      return Routes.Assets.avatars.facebook(facebookId, query);
    }
  }
};

