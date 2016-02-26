import User = Meteor.User;

export interface MeteorUser extends User {
  services: Services;
}

interface Services {
  facebook: FacebookService;
}

interface FacebookService {
  accessToken: string;
  expiresAt: number;
  id: number;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  link: string;
  gender: string //male | female
  locale: string //language => en_US | ??
  age_range: any;
}
