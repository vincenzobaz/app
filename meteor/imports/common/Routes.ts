
import {trim}   from 'lodash';
import {encode} from 'querystring'

import {Friend} from './models/Friend';

// FIXME: Move to client
export module Routes {

  export module Page {
    export function home() {
      return '/';
    }

    // FIXME: Type game to Game
    export function playGame(game: any) {
      return `/play/${game._id}`;
    }

    export function playGameId(gameId: any) {
      return `/play/${gameId}`;
    }

    export function account() {
      return '/account';
    }

    export function about() {
      return '/about';
    }

    export function games() {
      return '/games';
    }

    export function joinRequests() {
      return '/requests';
    }

    export function admin() {
      return '/admin';
    }

    export function stats() {
        return '/stats';
    }

    export function viewFeedback() {
        return '/view_feedback';
    }

  }

  export module Assets {

    // FIXME: Most likely this needs to be fixed
    export function at(path: string): string {
      return '/' + trim(path + '', '/');
    }

    export function avatarFor(friend: Friend): string {
      if (friend.isBot) {
        return this.avatars.bot();
      }

      return this.avatars.facebook(friend.facebookId);
    }

    export module avatars {
      export function unknown(): string {
        return '/images/avatar-default.png';
      }

      // TODO: Add proper profile pictures to bots
      export function bot(): string {
        return '/images/bot-avatar.png';
      }

      export function facebook(facebookId: string | number, query: any = ''): string {
        const qstr = query ? '?' + encode(query): '';
        return `https://graph.facebook.com/${facebookId}/picture${qstr}`;
      }
    }
  }

  export module Facebook {
    export function avatar(facebookId: string | number, width: number = 128) {
      return Routes.Assets.avatars.facebook(facebookId, `?type=square&width=${width}`);
    }
  }

};

