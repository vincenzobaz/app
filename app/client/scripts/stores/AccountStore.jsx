
import {MeteorPromise} from './../boot/helpers/meteor.jsx';

export const AccountStore = {

  deleteAllData() {
    return MeteorPromise('Account.deleteAllData');
  }

};


