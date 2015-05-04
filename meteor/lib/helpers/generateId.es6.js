
generateId = function() {
    return new Mongo.Collection.ObjectID()._str;
};

