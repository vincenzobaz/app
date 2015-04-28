
JoinRequests = new Mongo.Collection("joinRequests", {
    transform: function(doc){
        return new JoinRequest(doc._id, doc.from, doc.to, doc.gameId)
    }
});

JoinRequest = class JoinRequest {

    constructor(id, from, to, gameId) {
      this.id = id;
      this.from = from;
      this.to = to;
      this.gameId = gameId;
    }

    getId() {
        return this.id;
    }

    getFrom(){
        return this.from;
    }

    getTo(){
        return this.to;
    }

    getGameId(){
        return this.gameId;
    }

    save(callback) {
        var doc = _.pick(this, 'from', 'to',
            'gameId');

        if (Meteor.isServer) {

            if (this.id) {
                JoinRequest.update(this.id, {$set: doc}, callback);
            } else {
                // remember the context, since in callback it's changed
                var that = this;
                JoinRequests.insert(doc, function (error, result) {
                    that._id = result;

                    if (callback != null) {
                        callback.call(that, error, result);
                    }
                });
            }

        } else {
            throw new Meteor.Error(403, "Access Denied");
        }
    }
};
