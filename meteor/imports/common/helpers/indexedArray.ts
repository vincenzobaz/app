import * as _ from 'lodash';


export interface Entry<A> {
  index: number;
  element: A;
}
export function indexArray<A>(array: A[]): Entry<A>[] {
  return _.range(9).map((i: number) => {return {index: i, element: array[i]}});
}
