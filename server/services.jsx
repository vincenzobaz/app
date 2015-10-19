
(function() {

var abort = false;

  [ 'FACEBOOK_APPID',
    'FACEBOOK_SECRET',
    'GMAPS_KEY',
    'TIMEOUT_BETWEEN_FETCHES',
    'GAME_CREATOR_URL'
  ].forEach(key => {
  if (process.env[key] == null) {
    console.error('ERROR: Missing environement variable %s', key);
    abort = true;
  }
});

if (abort) {
  process.exit(1);
}

const appId = process.env.FACEBOOK_APPID;
const secret = process.env.FACEBOOK_SECRET;
const gmapsKey = process.env.GMAPS_KEY;

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

})();

