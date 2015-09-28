
JoinRequests = new Mongo.Collection("joinRequests", {
    transform: function(doc){
        return new JoinRequest(doc);
    }
});

JoinRequestProps = ['_id', 'from', 'to', 'gameId'];

JoinRequest = class JoinRequest {

    constructor(props) {
        assignProps(this, JoinRequestProps, props);
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

JoinRequest.fromRaw = (request) =>
    new JoinRequest(request);

