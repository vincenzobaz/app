
JoinRequests = new Mongo.Collection("joinRequests", {
    transform: function(doc){
        return new JoinRequest(doc._id, doc.from, doc.to, doc.gameId)
    }
});

//data model

/**
 *
 * @param id the mongodb id
 * @param from who sent the request
 * @param to to whom the request is sent
 * @param gameId the id of the game which was created for the request
 * @constructor
 */

JoinRequest = function(id, from, to, gameId){
    this._id = id;
    this._from = from;
    this._to = to;
    this._gameId = gameId;
};

JoinRequest.prototype = {
    get id() {
        return this._id;
    },
    get from(){
        return this._from;
    },
    get to(){
        return this._to;
    },
    get gameId(){
        return this._gameId;
    },

    save: function(callback) {
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
