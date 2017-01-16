
App.info({
    id: 'me.reminisce',
    name: 'reminisceme',
    description: 'Reminisce Me',
    author: 'Reminisce.me',
    email: 'contact@example.com',
    website: 'http://www.reminisce.me',
    version: '0.1'
});

// Set up resources such as icons and launch screens.
App.icons({
    // 'iphone': 'icons/icon-60.png',
    // 'iphone_2x': 'icons/icon-60@2x.png',
    // 'ipad': 'icons/icon-60.png',
    // 'ipad_2x': 'icons/icon-60@2x.png',
    // ... more screen sizes and platforms ...
    'android_mdpi': 'public/icons/icon-48.png',
    'android_hdpi': 'public/icons/icon-72.png',
    'android_xhdpi': 'public/icons/icon-96.png',
    'android_xxhdpi': 'public/icons/icon-144.png',
    'android_xxxhdpi': 'public/icons/icon-192.png',
});

App.launchScreens({
    // 'ipad_portrait': 'splash/Default~ipad-portrait.png',
    // 'ipad_portrait_2x': 'splash/Default~ipad-portrait@2x.png',
    // 'ipad_landscape': 'splash/Default~ipad-landscape.png',
    // 'ipad_landscape_2x': 'splash/Default~ipad-landscape@2x.png',

    // ... more screen sizes and platforms ...
    'android_mdpi_portrait': 'public/splash/finalSplash.9.png',
    'android_mdpi_landscape': 'public/splash/finalSplash.9.png',
    'android_hdpi_portrait': 'public/splash/finalSplash.9.png',
    'android_hdpi_landscape': 'public/splash/finalSplash.9.png',
    'android_xhdpi_portrait': 'public/splash/finalSplash.9.png',
    'android_xhdpi_landscape': 'public/splash/finalSplash.9.png',
    'android_xxhdpi_portrait': 'public/splash/finalSplash.9.png',
    'android_xxhdpi_landscape': 'public/splash/finalSplash.9.png',
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('SplashScreenBackgroundColor', '#ffffff');
App.accessRule('*');

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('cordova-plugin-facebook4', {
    APP_ID: '<YOUR_APP_ID>',
    API_KEY: '<YOUR_KEY>',
    APP_NAME: 'reminisce.me'
});

