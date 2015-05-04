
GameBoards = new Mongo.Collection('gameBoards', {
    transform(doc) {
        return new GameBoard(doc);
    }
});

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
    const tiles = _.map(data.tiles, tile => {
        const question1 = Question.fromRaw(tile, tempFixQuestion(tile.question1));
        const question2 = Question.fromRaw(tile, tempFixQuestion(tile.question2));
        const question3 = Question.fromRaw(tile, tempFixQuestion(tile.question3));

        return new Tile({
            _id: generateId(),
            type: tile.type,
            question1,
            question2,
            question3
        });
    });

    return new GameBoard({ userId, tiles });
};

const tempFixQuestion = (q) => {
    const fixed = Object.assign({}, q.question, q);
    delete fixed.question;
    return fixed;
};
