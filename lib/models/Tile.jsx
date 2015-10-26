
const TileProps = ['_id', 'type', 'question1', 'question2', 'question3', 'score', 'answered', 'disabled'];

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

    /**
     * return the array of questions for the tile
     * @return {[Question]}
     */
    getQuestions() {
        return [this.question1, this.question2, this.question3];
    }

    setDisabled(value) {
        this.disabled = value;
    }

    getIsDisabled() {
        return this.disabled;
    }

    isDisabled() {
        return this.disabled;
    }

    getIsAnswered() {
        return this.answered;
    }

    isAnswered() {
        return this.answered;
    }

    setAnswered(value) {
        this.answered = value;
    }

    static fromRaw(tile) {
        const question1 = Question.fromRaw(tile, tile.question1);
        const question2 = Question.fromRaw(tile, tile.question2);
        const question3 = Question.fromRaw(tile, tile.question3);

        return new Tile({
            _id: tile._id || generateId(),
            type: tile.type,
            question1: question1,
            question2: question2,
            question3: question3,
            score: 0,
            answered: !!tile.answered,
            disabled: !!tile.disabled
        });
    }
};
