
const Meteor = require('../helpers/meteor');

const AccountStore = {

  deleteAllData() {
    return Meteor.call('Account.deleteAllData');
  }

};

module.exports = AccountStore;

