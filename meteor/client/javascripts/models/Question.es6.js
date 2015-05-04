
Reminisce.Model.Question = class Question {

  constructor(props, tile) {
    Object.assign(this, props);

    this.tile = tile;
  }

  getId() {
    return this._id;
  }

  getTile() {
    return this.tile;
  }

  getKind() {
    return this.kind;
  }

  getType() {
    return this.tile.getType();
  }

  isAnswered() {
    return !!this.answered;
  }

  getPost() {
    return this.post;
  }

  getComment() {
    return this.comment;
  }

}

