generateId = function() {
    return new Mongo.Collection.ObjectID()._str;
};

prettyLog = function(object) {
    console.log(JSON.stringify(object, null, 2));
};
