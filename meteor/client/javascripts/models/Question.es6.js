
class Question {

  constructor(props, tile) {
    _.extend(this, props);
    this.tile = tile;
  }

  getId() {
    return this._id;
  }

  getTile() {
    return this.tile;
  }

  getType() {
    return this.type;
  }

  isAnswered() {
    return !!this.answered;
  }

  getData() {
    return this.data;
  }

}

