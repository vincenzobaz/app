import {GlobalEventBus}      from './events';
import {DesktopNotificationService}  from './services/notification/DesktopNotificationService';
import {FacebookNotificationService} from './services/notification/FacebookNotificationService';
import {StatsFeederService} from "./services/StatsFeederService";
import {Game, RawGame} from "../server/collections/Game";
import {HTTPHelper} from "./helpers/http";
import {Events} from "./events";

interface Env {
  FACEBOOK_APPID: string;
  FACEBOOK_SECRET: string;
  FACEBOOK_NOTIF_INTERVAL: number;
  GAME_CREATOR_URL: string;
  GMAPS_KEY: string;
  STATS_URL: string;
  TIMEOUT_BETWEEN_FETCHES: number;
};

const variables = [
  'FACEBOOK_APPID',
  'FACEBOOK_SECRET',
  'FB_NOTIF_INTERVAL',
  'GAME_CREATOR_URL',
  'GMAPS_KEY',
  'STATS_URL',
  'TIMEOUT_BETWEEN_FETCHES'
];

function checkEnvironment(): Env {
    if (process.env.APP_LOG_LOCATION == null) {
        console.error("Missing APP_LOG_LOCATION environment variable");
        process.exit(1);
    }

    let abort = false;

    const env = {};

    variables.forEach(key => {
        if (process.env[key] == null) {
            console.error('Missing environment variable %s', key);
            logger.error('Missing environment variable %s', key);
            abort = true;
        }

        env[key] = process.env[key];
    });

    if (abort) {
        process.exit(1);
        return;
    }

    return <Env>env;
}

function setupFacebook(appId: string, secret: string) {
    ServiceConfiguration.configurations.upsert(
        {service: 'facebook'},
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

function setupGoogleMaps(key: string) {
    ServiceConfiguration.configurations.upsert(
        {service: 'gmaps'},
        {
            $set: {
                zoom: 9,
                apiKey: key,
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

function setupLogger() {
    const path = require('path');
    let logLocation = 'app.log';

    if (process.env.APP_LOG_LOCATION != null) {
        logLocation = process.env.APP_LOG_LOCATION;
    }

    if (!path.isAbsolute(logLocation)) {
      logLocation = path.resolve(__dirname, logLocation);
    }

    let fileOptions = {
        level: 'debug',
        colorize: false,
        timestamp: true,
        json: true,
        logstash: true,
        showLevel: true,
        filename: logLocation
    };

    logger.addTransport('file', fileOptions);
    logger.info("Application started");
    console.log("Application started");
}

function setupNotifications(interval: number = 12 * 60 * 60 * 1000) {
    const services = [
        new DesktopNotificationService(),
        new FacebookNotificationService()
    ];

    services.forEach(service => service.subscribeTo(GlobalEventBus));

    Meteor.setInterval(
      FacebookNotificationService.send.bind(FacebookNotificationService),
      interval
    );

    const conf = ServiceConfiguration.configurations.findOne({ service: 'fbNotifs' });

    if (conf != null && conf.lastSent != null) {
      const lastSent = +conf.lastSent;
      const atMost   = (+new Date()) - (+interval);

      if (lastSent > atMost) {
        return;
      }
    }

    FacebookNotificationService.send();
}

function setupStatsFeeder(statsUrl: string) {
    const feeder = new StatsFeederService(statsUrl);
    feeder.subscribeTo(GlobalEventBus);

    logger.info("StatsFeeder has been started");
}

export function setupServices(): Env {
    setupLogger();

    const env = checkEnvironment();

    setupFacebook(env.FACEBOOK_APPID, env.FACEBOOK_SECRET);
    setupGoogleMaps(env.GMAPS_KEY);
    setupNotifications(env.FB_NOTIF_INTERVAL);
    setupStatsFeeder(env.STATS_URL);

    return env;
}

