
import { GlobalEventBus }      from './events';
import { DesktopNotificationService }  from './services/notification/DesktopNotificationService';
import { FacebookNotificationService } from './services/notification/FacebookNotificationService';

function checkEnvironment() {
  let abort = false;

  ['FACEBOOK_APPID',
    'FACEBOOK_SECRET',
    'GMAPS_KEY',
    'TIMEOUT_BETWEEN_FETCHES',
    'GAME_CREATOR_URL'
  ].forEach(key => {
    if (process.env[key] == null) {
      console.error('ERROR: Missing environment variable %s', key);
      abort = true;
    }
  });

  if (abort) {
    process.exit(1);
  }
}

function setupFacebook() {
  //noinspection TypeScriptUnresolvedVariable
  const appId = process.env.FACEBOOK_APPID;
  //noinspection TypeScriptUnresolvedVariable
  const secret = process.env.FACEBOOK_SECRET;

  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        loginStyle: 'popup',
        appId: appId,
        secret: secret,
        scope: ['public_profile', 'user_friends', 'email', 'user_likes', 'user_photos', 'user_posts', 'user_status', 'user_tagged_places']
      }
    }
  );
}

function setupGoogleMaps() {
  //noinspection TypeScriptUnresolvedVariable
  const gmapsKey = process.env.GMAPS_KEY;

  ServiceConfiguration.configurations.upsert(
    { service: 'gmaps' },
    {
      $set: {
        zoom: 9,
        apiKey: gmapsKey,
        sensor: false,
        marker: {
          initialPosition: {
            latitude: 46.5285085,
            longitude: 6.5601122
          }
        }
      }
    }
  );
}

function setupNotifications() {
  const isDev = process.env.NODE_ENV === 'development';

  const services = [
    new DesktopNotificationService(isDev),
    new FacebookNotificationService(isDev)
  ];

  services.forEach(service => service.subscribeTo(GlobalEventBus));
}

export function setupServices() {
  checkEnvironment();

  setupFacebook();
  setupGoogleMaps();
  setupNotifications();
}

