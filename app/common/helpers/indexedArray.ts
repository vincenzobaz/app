export interface entry<A> {
  index: number;
  element: A;
}
export function indexArray<A>(array: A[]): entry<A>[] {
  return _.range(9).map((i: number) => {return {index: i, element: array[i]}});
}
