
export function generateId() {
    return new Mongo.Collection.ObjectID()._str;
};

