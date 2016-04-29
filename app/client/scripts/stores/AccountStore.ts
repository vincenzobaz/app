
import {MeteorPromise} from '../helpers/meteor';

export module AccountStore {

  export function deleteAllData() {
    return MeteorPromise.call('Account.deleteAllData');
  }

};


