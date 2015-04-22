generateId = function() {
    return new Mongo.ObjectID()._str;
};

prettyLog = function(object) {
    console.log(JSON.stringify(object, null, 2));
};