
JoinRequests = new Mongo.Collection("joinRequests", {
    transform: function(doc){
        return new JoinRequest(doc._id, doc.from, doc.to, doc.gameId)
    }
});

JoinRequest = class JoinRequest {

    constructor(id, from, to, gameId) {
      this._id = id;
      this.from = from;
      this.to = to;
      this.gameId = gameId;
    }

    getId() {
        return this._id;
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

};
