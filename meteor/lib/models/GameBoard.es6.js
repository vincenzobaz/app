
const GameBoardProps = ['_id', 'userId', 'tiles'];

GameBoard = class GameBoard {

    constructor(props) {
        assignProps(this, GameBoardProps, props);
    }

    getId() {
        return this._id;
    }

    getUserId() {
        return this.userId;
    }

    getTiles() {
        return this.tiles;
    }

};

GameBoard.fromRaw = function(userId, data) {
    if (typeof userId === 'object') {
        data = userId;
        userId = data.userId;
    }

    const tiles = _.map(data.tiles, tile => {
        const question1 = Question.fromRaw(tile, tile.question1);
        const question2 = Question.fromRaw(tile, tile.question2);
        const question3 = Question.fromRaw(tile, tile.question3);

        return new Tile({
            _id: data._id || generateId(),
            type: tile.type,
            question1,
            question2,
            question3
        });
    });

    return new GameBoard({ userId, tiles });
};

