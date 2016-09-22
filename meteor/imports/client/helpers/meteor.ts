
import * as Promise from 'bluebird';

export module MeteorPromise  {
  export function call(method: string, ...args: any[]): Promise<any> {
    //This allows to pass the function name as well as all the arguments correctly into the meteor context
    return Promise.promisify(Meteor.call, { context: Meteor }).apply(Meteor, [method].concat(args));
  }
}

