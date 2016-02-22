
import {MeteorPromise} from './../boot/helpers/meteor';

export const AccountStore = {

  deleteAllData() {
    return MeteorPromise('Account.deleteAllData');
  }

};


