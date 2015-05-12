
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    getQuestionTitleByType = require('./getQuestionTitleByType'),
    Prop = require('../Prop'),
    shapes = require('../shapes'),
    Post = require('../Post');

var MultipleChoice = React.createClass({

  propTypes: {
    type: React.PropTypes.string.isRequired,
    subject: shapes.post.isRequired,
    choices: React.PropTypes.arrayOf(shapes.choice).isRequired,
    onDone: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      selected: null
    };
  },

  render() {
    return (
      <div className="question question-multiplechoice">
        <h4>{getQuestionTitleByType(this.props.type)}</h4>
        <div className="question-subject grid-50">
          <Post post={this.props.subject} />
        </div>
        <div className="question-input grid-50">
          <ul className='answers avatar-answers'>
            {this.props.choices.map(this.renderChoice)}
          </ul>
        </div>
      </div>
    );
  },

  renderChoice(choice, index) {
    return (
      <li key={`${Math.round(Math.random() * 1000) + '-' + choice.value}`}>
        <Button onClick={this.onChoice(choice, index)}>
          <Prop {...choice} />
        </Button>
      </li>
    );
  },

  onChoice(choice, index) {
    return (e) => {
      this.props.onDone({
        choice: index
      });
    };
  }

});

module.exports = MultipleChoice;
