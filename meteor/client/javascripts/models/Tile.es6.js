
Reminisce.Model.Tile = class Tile {

  constructor(props) {
    _.extend(this, props);
  }

  getId() {
    return this._id;
  }

  getCategory() {
    return this.category;
  }

  getType() {
    return this.type;
  }

  getIcon() {
    return this.icon;
  }

  getScore() {
    return this.score;
  }

  getQuestions() {
    return lazy(this, 'questions', qs =>
      qs.map(q => new Reminisce.Model.Question(q, this)));
  }

  isAnswered() {
    return !!this.answered;
  }

}

