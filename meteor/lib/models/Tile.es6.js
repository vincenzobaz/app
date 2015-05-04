
const TileProps = ['_id', 'type', 'question1', 'question2', 'question3'];

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
};

