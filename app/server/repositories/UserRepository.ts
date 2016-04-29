
import { MeteorUser } from '../MeteorUser';

export const UserRepository = {

  byId(id: Mongo.ObjectID | string): MeteorUser {
    return Meteor.users.findOne(id);
  },

  byFacebookId(facebookId: string): MeteorUser {
    return Meteor.users.findOne({ 'services.facebook.id': facebookId });
  }

};

