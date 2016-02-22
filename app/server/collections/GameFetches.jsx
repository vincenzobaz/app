export const GameFetches = new Mongo.Collection('gameFetches', {
    transform(doc) {
        return new GameFetch(doc);
    }
});

let GameFetchProps = ['_id', 'gameId', 'playerId', 'player', 'tries'];

export class GameFetch {

    constructor(props) {
        assignProps(this, GameFetchProps, props);
    }

    getId() {
        return this._id;
    }

    getGameId() {
        return this.gameId;
    }

    getPlayerId() {
        return this.playerId;
    }

    getPlayer() {
        return this.player;
    }

    getTries() {
        return this.tries;
    }

    incrementTries() {
        this.tries += 1;
    }

};


