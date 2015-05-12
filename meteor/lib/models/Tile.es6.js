
const TileProps = ['_id', 'type', 'question1', 'question2', 'question3', 'score', 'answered'];

Tile = class Tile {

    constructor(props) {
        assignProps(this, TileProps, props);
    }

    getId() {
        return this._id;
    }

    getType() {
        return this.type;
    }

    getIcon() {
        return 'list';
    }

    getScore() {
        return this.score || {
            me: 0,
            them: 0
        };
    }

    getQuestion1() {
        return this.question1;
    }

    getQuestion2() {
        return this.question2;
    }

    getQuestion3() {
        return this.question3;
    }

    getQuestions() {
        return [ this.question1,
                 this.question2,
                 this.question3 ];
    }

    isAnswered() {
        return false;
    }
};

Tile.fromRaw = (tile) => {
    const question1 = Question.fromRaw(tile, tile.question1);
    const question2 = Question.fromRaw(tile, tile.question2);
    const question3 = Question.fromRaw(tile, tile.question3);

    return new Tile({
        _id: tile._id || generateId(),
        type: tile.type,
        question1,
        question2,
        question3
    });
};

