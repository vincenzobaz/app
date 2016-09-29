
export interface MeteorUser extends Meteor.User {
  services?: Services;
  profile?: Profile;
}

export interface Profile {
  name?: string;
}

export interface Services {
  facebook: FacebookService;
}

export interface FacebookService {
  accessToken: string;
  expiresAt: number;
  id: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  link: string;
  gender: string; //male | female
  locale: string; //language => en_US | ??
  age_range: any;
}

