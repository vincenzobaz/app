
import {MeteorPromise} from './../boot/helpers/meteor';

export module AccountStore {

  export function deleteAllData() {
    return MeteorPromise.call('Account.deleteAllData');
  }

};


