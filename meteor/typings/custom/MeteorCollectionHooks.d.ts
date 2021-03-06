
interface HooksFunction<T> {
  (_id: string | Mongo.ObjectID, doc: T, fieldNames?: string[], modifier?: any, options?:any);
}

interface HooksCallBack<T> {
  (call: HooksFunction<T>, options?: any): void;
}

declare module Mongo {

  interface MongoCollectionOperations<T> {
    insert: HooksCallBack<T>;
    update: HooksCallBack<T>;
  }

  interface Collection<T> {
    after: MongoCollectionOperations<T>;
  }
}
