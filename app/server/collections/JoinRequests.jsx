
import {assignProps} from './../../common/helpers/assignProps.jsx';

export const JoinRequests = new Mongo.Collection("joinRequests", {
    transform: function(doc){
        return new JoinRequest(doc);
    }
});

export const JoinRequestProps = ['_id', 'from', 'to', 'gameId'];

export class JoinRequest {

    constructor(props) {
        assignProps(this, JoinRequestProps, props);
    }

    getId() {
        return this._id;
    }

    getFrom() {
        return this.from;
    }

    getTo() {
        return this.to;
    }

    getGameId() {
        return this.gameId;
        return this.gameId;
    }

    static fromRaw(request) {
      return new JoinRequest(request);
    }

}

