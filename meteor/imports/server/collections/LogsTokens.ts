import LogsToken from "./LogsToken";

export const LogsTokens = new Mongo.Collection<LogsToken>("logsTokens", {
    transform: function(doc){
        return LogsToken.fromRaw(doc);
    }
});
