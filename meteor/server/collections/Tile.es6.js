
const TileProps = ['_id', 'type', 'question1', 'question2', 'question3'];

Tile = class Tile {

    constructor(props) {
        assignProps(this, TileProps, props);

        if (this.questions === undefined) {
            this.questions = [ this.question1,
                               this.question2,
                               this.question3 ];
        }
    }

    getId() {
        return this._id;
    }

    getType() {
        return this.type;
    }

    getQuestion1() {
        return this.questions[0];
    }

    getQuestion2() {
        return this.questions[1];
    }

    getQuestion3() {
        return this.questions[2];
    }

    getQuestions(){
        return this.questions;
    }
};

