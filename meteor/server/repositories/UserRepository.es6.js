
UserRepository = {

    byFacebookId(facebookId) {
        return Meteor.users.findOne({ 'services.facebook.id': facebookId });
    }

};

