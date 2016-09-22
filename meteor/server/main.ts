
import { App } from '../imports/server';

const app = new App();

Meteor.startup(() => {
  app.run();
});

Accounts.onLogin(attempt => {
  app.onLogin(attempt);
});

