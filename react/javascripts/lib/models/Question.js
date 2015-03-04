
'use strict';

var merge = require('lodash.merge');

class Question {

  constructor(props, tile) {
    merge(this, props);
    this.tile = tile;
  }

  getId() {
    return this.id;
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

module.exports = Question;
