
import { MeteorUser } from '../../common/collections/MeteorUser';

export const UserRepository = {

  byAnyId(id: Mongo.ObjectID | string): MeteorUser {
    const idStr = <string>id.valueOf();
    const byUserId = UserRepository.byId(idStr);

    if (byUserId != null) {
      return byUserId;
    }

    return UserRepository.byFacebookId(idStr);
  },

  byId(id: Mongo.ObjectID | string): MeteorUser {
    return <MeteorUser>Meteor.users.findOne(id);
  },

  byFacebookId(facebookId: string): MeteorUser {
    return <MeteorUser>Meteor.users.findOne({ 'services.facebook.id': facebookId });
  }

};

