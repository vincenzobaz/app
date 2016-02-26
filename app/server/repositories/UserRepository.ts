
export const UserRepository = {

    byFacebookId(facebookId): Meteor.User {
        return Meteor.users.findOne({ 'services.facebook.id': facebookId });
    }

};

