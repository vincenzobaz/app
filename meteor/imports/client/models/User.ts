
import {Services, FacebookService} from "../../common/collections/MeteorUser";
import {TrainingStatus}            from "./TrainingStatus";
import {Routes}                    from "../../common/Routes";

interface Profile {
  name: string;
  isDev: boolean;
}

interface RawUser {
  _id: Mongo.ObjectID | string;
  services: Services;
  profile: Profile;
}

export class User {
  private fb: FacebookService;

  constructor(
    public _id: Mongo.ObjectID,
    public username: string,
    public services: Services,
    public profile: Profile,
    public status: TrainingStatus = TrainingStatus.NotStarted,
    public firstTime: boolean = true
  ) {
    this.fb = services.facebook;
  }

  get facebookId(): string {
    return this.fb.id;
  }

  get firstName(): string {
    return this.fb.first_name;
  }

  get lastName(): string {
    return this.fb.last_name;
  }

  get name(): string {
    return this.fb.name;
  }

  get gender(): string {
    return this.fb.gender;
  }

  get email(): string {
    return this.fb.email;
  }

  get locale(): string {
    return this.fb.locale;
  }

  isBot(): boolean {
    return this.username && (this.username == 'bot1' || this.username == 'bot2');
  }

  getAvatarUrl(): string {

    if (this.isBot()) {
      return Routes.Assets.at('images/bot-avatar.png');
    }

    if (this.facebookId != null) {
      return Routes.Facebook.avatar(this.facebookId);
    }

    return Routes.Assets.at('images/avatar-default.png');
  }

}

