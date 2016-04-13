
import {trim} from 'lodash';
import {encode} from 'querystring'

import {Friend} from './models/Friend';

export const Routes = {

  Assets: {

    // FIXME: Most likely this needs to be fixed
    at(path: string): string {
      return '/' + trim(path + '', '/');
    },

    avatarFor(friend: Friend): string {
      if (friend.isBot) {
        return this.avatars.bot();
      }

      return this.avatars.facebook(friend.facebookId);
    },

    avatars: {
      default(): string {
        return 'images/avatar-default.png';
      },

      // TODO: Add proper profile pictures to bots
      bot(): string {
        return 'http://www.distilnetworks.com/wp-content/themes/distil/images/theft-bot-home.png';
      },

      facebook(facebookId: string | number, query: any = ''): string {
        const qstr = query ? '?' + encode(query): '';
        return `https://graph.facebook.com/${facebookId}/picture${qstr}`;
      }
    }
  },

  Facebook: {
    avatar(facebookId: string | number, query?: any) {
      return Routes.Assets.avatars.facebook(facebookId, query);
    }
  }

};

