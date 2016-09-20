
App.info({
    id: 'me.reminisce',
    name: 'reminisceme',
    description: 'Reminisce Me',
    author: 'Roger Küng',
    email: 'contact@example.com',
    website: 'http://www.reminisce.me'
});

// Set up resources such as icons and launch screens.
// App.icons({
//     'iphone': 'icons/icon-60.png',
//     'iphone_2x': 'icons/icon-60@2x.png',
//     'ipad': 'icons/icon-60.png',
//     'ipad_2x': 'icons/icon-60@2x.png',
//     // ... more screen sizes and platforms ...
// });

// App.launchScreens({
//     'ipad_portrait': 'splash/Default~ipad-portrait.png',
//     'ipad_portrait_2x': 'splash/Default~ipad-portrait@2x.png',
//     'ipad_landscape': 'splash/Default~ipad-landscape.png',
//     'ipad_landscape_2x': 'splash/Default~ipad-landscape@2x.png',

//     // ... more screen sizes and platforms ...
// });

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.accessRule('*');

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
    APP_ID: '163998950420801',
    API_KEY: '90b457672abab6475e8683307229818f',
    APP_NAME: 'reminisce.me'
});

