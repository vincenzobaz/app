
Reminisce.Model.User = class User {

  constructor(props) {
    _.extend(this, props);

    if (this.fb === undefined) {
        this.fb = this.services && this.services.facebook || {};
    }

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

  getName() {
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

  isBot() {
    return this.username && (this.username === 'bot1' || this.username === 'bot2');
  }

  getAvatarUrl() {
    var Routes = Reminisce.Routes;

    if (this.isBot()) {
        return Routes.Assets.at('images/bot-avatar.png');
    }

    if (this.getFacebookId() != null) {
      return Routes.Facebook.avatar(this.getFacebookId());
    }

    return Routes.Assets.at('images/avatar-default.png').url;
  }
}

