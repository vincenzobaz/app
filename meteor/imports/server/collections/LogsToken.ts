export interface RawLogsToken {
    _id: string | Mongo.ObjectID;
    expires: number;
}

export default class LogsToken implements RawLogsToken {

    constructor(public _id: string | Mongo.ObjectID,
                public expires: number) {
    }

    static fromRaw(raw: RawLogsToken) {
        return new LogsToken(raw._id, raw.expires);
    }

}

