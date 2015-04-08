
'use strict';

var merge = require('lodash.merge');
var Routes = require('../Routes');

class User {

  constructor(props) {
    merge(this, props);
  }

  getId() {
    return this._id;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getFullName() {
    return this.name || `${this.firstName} ${this.lastName}`;
  }

  getFacebookId() {
    return this.facebookId;
  }

  getTrainingStatus() {
    return this.trainingStatus;
  }

  isFirstTime() {
    return this.firstTime;
  }

  getAvatarUrl() {
    if (this.facebookId != null) {
      return Routes.Facebook.avatar(this.facebookId);
    }

    return Routes.Assets.at('images/avatar-default.png').url;
  }
}

module.exports = User;

