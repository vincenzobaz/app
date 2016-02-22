
import ObjectID = Mongo.ObjectID;
import {ScoreInterface, Score} from "./Score";
import {questionFromRaw} from "./questions/QuestionFactory";
import Question from "./Question";

export interface RawTile {
  _id: ObjectID;
  type: string;
  question1: Question;
  question2: Question;
  question3: Question;
  score: ScoreInterface;
  answered: boolean;
  disabled: boolean;
}

export class Tile implements RawTile {

  public _id: ObjectID;
  public type: string;
  public question1: Question;
  public question2: Question;
  public question3: Question;
  public score: ScoreInterface;
  public answered: boolean;
  public disabled: boolean;

  constructor(_id:ObjectID,
              type:string,
              question1:Question,
              question2:Question,
              question3:Question,
              score:ScoreInterface = new Score(0, 0),
              answered:boolean = false,
              disabled:boolean = false) {
    this._id = _id;
    this.type = type;
    this.question1 = question1;
    this.question2 = question2;
    this.question3 = question3;
    this.score = score;
    this.answered = answered;
    this.disabled = disabled;
  }


  /**
   * return the array of questions for the tile
   * @return {[Question]}
   */
  get questions():Question[] {
    return [this.question1, this.question2, this.question3];
  }

  get isDisabled() {
    return this.disabled;
  }

  get isAnswered() {
    return this.answered;
  }

  static fromRaw(tile) {
    const question1 = Question.fromRaw(tile.question1);
    const question2 = questionFromRaw(tile.question2);
    const question3 = questionFromRaw(tile.question3);
    return new Tile(
        tile._id || new Mongo.ObjectID(),
        tile.type,
        question1,
        question2,
        question3,
        new Score(0, 0),
        tile.answered,
        tile.disabled
    );
  }
}

