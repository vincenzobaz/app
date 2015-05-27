
Friends = new Mongo.Collection('friends', {
    transform(doc) {
        return Friend.fromRaw(doc);
    }
});

