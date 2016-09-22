

export class FacebookClientService {
  static getFacebookId(userId: string | Mongo.ObjectID) {
    const meteorUser = Meteor.users.findOne(userId);
    if (meteorUser && meteorUser.services && meteorUser.services.facebook) {
      return meteorUser.services.facebook.id;
    } else {
      return null;
    }
  }
}
