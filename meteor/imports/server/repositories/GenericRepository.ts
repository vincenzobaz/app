
interface HasId {
  _id?: Mongo.ObjectID;
}

export class GenericRepository<A extends HasId> {

  constructor(private coll: Mongo.Collection<A>) {}

  save(obj: A): A {
    if (obj._id != null) {
      this.coll.upsert(obj._id, obj);
    }
    else {
      obj._id = new Mongo.ObjectID();
      this.coll.insert(obj);
    }

    return obj;
  }
};

