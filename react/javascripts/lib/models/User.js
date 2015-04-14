
'use strict';

var merge = require('lodash.merge');
var Routes = require('../Routes');

class User {

  constructor(props) {
    merge(this, props);
    this.fb = this.services && this.services.facebook || {};
    delete this.services;
  }

  getId() {
    return this._id;
  }

  getFacebookId() {
    return this.fb.id;
  }

  getFirstName() {
    return this.fb.first_name;
  }

  getLastName() {
    return this.fb.last_name;
  }

  getFullName() {
    return this.fb.name;
  }

  getGender() {
    return this.fb.gender;
  }

  getEmail() {
    return this.fb.email;
  }

  getLocale() {
    return this.fb.locale;
  }

  getTrainingStatus() {
    return this.trainingStatus || 'not started';
  }

  isFirstTime() {
    return this.firstTime || true;
  }

  getAvatarUrl() {
    if (this.getFacebookId() != null) {
      return Routes.Facebook.avatar(this.getFacebookId());
    }

    return Routes.Assets.at('images/avatar-default.png').url;
  }
}

module.exports = User;

