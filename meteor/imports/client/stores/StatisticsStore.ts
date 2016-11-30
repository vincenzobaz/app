
import * as Promise from 'bluebird';

import { MeteorPromise } from "../helpers/meteor"

export function getStatistics(from? : Date, to? : Date): Promise<any> {
    return MeteorPromise.call('fetchStats', from, to);
}
