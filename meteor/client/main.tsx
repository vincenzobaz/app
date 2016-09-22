
import { App } from '../imports/client';

const app = new App();

Meteor.startup(function() {
    app.boot();
    app.render();
});

