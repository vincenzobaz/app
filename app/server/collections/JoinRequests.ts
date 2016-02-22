

import JoinRequest from "./JoinRequest";

export const JoinRequests = new Mongo.Collection("joinRequests", {
    transform: function(doc){
        return JoinRequest.fromRaw(doc);
    }
});




