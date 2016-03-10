
'use strict';

export module MeteorPromise  {
  export function call(method: string, ...args: any[]) {
    //This allows to pass the function name as well as all the arguments correctly into the meteor context
    return Promise.promisify(Meteor.call, Meteor).apply(Meteor, [method].concat(args));
  }
}

