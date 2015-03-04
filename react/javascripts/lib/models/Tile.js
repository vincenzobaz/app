
'use strict';

var merge = require('lodash.merge');
var lazy = require('../helpers/lazy');

var Question = require('./Question');

class Tile {

  constructor(props) {
    merge(this, props);
  }

  getId() {
    return this.id;
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
      qs.map(q => new Question(q, this)));
  }

  isAnswered() {
    return !!this.answered;
  }

}

module.exports = Tile;
