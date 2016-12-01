import {GlobalEventBus}      from './events';
import {DesktopNotificationService}  from './services/notification/DesktopNotificationService';
import {FacebookNotificationService} from './services/notification/FacebookNotificationService';
import {StatsFeederService} from "./services/StatsFeederService";
import {Game, RawGame} from "../server/collections/Game";
import {HTTPHelper} from "./helpers/http";
import {Events} from "./events";

function checkEnvironment() {
    if (process.env.APP_LOG_LOCATION == null) {
        console.error("Missing APP_LOG_LOCATION environment variable");
        process.exit(1);
    }

    let abort = false;

    ['FACEBOOK_APPID',
        'FACEBOOK_SECRET',
        'GMAPS_KEY',
        'TIMEOUT_BETWEEN_FETCHES',
        'GAME_CREATOR_URL',
        'STATS_URL'
    ].forEach(key => {
        if (process.env[key] == null) {
            logger.error('Missing environment variable %s', key);
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

function setupGoogleMaps() {
    //noinspection TypeScriptUnresolvedVariable
    const gmapsKey = process.env.GMAPS_KEY;

    ServiceConfiguration.configurations.upsert(
        {service: 'gmaps'},
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
    logger.info("APPLICATION STARTED");
    console.log("Logging has started")
}

function setupNotifications() {
    const isDev = process.env.NODE_ENV === 'development';

    //FIXME: Sending too many Facebook Notifications is dangerous and can get the app banned
    const services = [
        new DesktopNotificationService(isDev),
        new FacebookNotificationService(isDev)
    ];

    services.forEach(service => service.subscribeTo(GlobalEventBus));
}

function setupStatsFeeder() {
    let stats_url = process.env.STATS_URL;

    let feeder: StatsFeederService = new StatsFeederService(stats_url);
    feeder.subscribeTo(GlobalEventBus);

    logger.info("StatsFeeder has been started");
}

export function setupServices() {
    setupLogger();
    checkEnvironment();
    setupFacebook();
    setupGoogleMaps();
    setupNotifications();
    setupStatsFeeder();
}

