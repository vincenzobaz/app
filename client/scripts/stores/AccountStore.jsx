
const AccountStore = {

  deleteAllData() {
    return R.Meteor.call('Account.deleteAllData');
  }

};

Reminisce.AccountStore = AccountStore;

