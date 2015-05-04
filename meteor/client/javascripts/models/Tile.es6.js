
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
    return this.icon || 'list';
  }

  getScore() {
    return this.score || {
      me: 0,
      them: 0
    };
  }

  getQuestions() {
    return lazy(this.getId(), this, 'questions', qs =>
      qs.map(q => new Reminisce.Model.Question(q, this)));
  }

  isAnswered() {
    return !!this.answered;
  }

}

