

import JoinRequest from "./JoinRequest";

export const JoinRequests = new Mongo.Collection<JoinRequest>("joinRequests", {
    transform: function(doc){
        return JoinRequest.fromRaw(doc);
    }
});




