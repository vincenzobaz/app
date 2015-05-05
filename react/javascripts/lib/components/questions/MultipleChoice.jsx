
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    Prop = require('../Prop'),
    shapes = require('../shapes'),
    Post = require('../Post');

var MultipleChoice = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
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
      <div>
        <h4>{this.props.title}</h4>
        <Post post={this.props.subject} />
        <ul className='answers avatar-answers'>
          {this.props.choices.map(this.renderChoice)}
        </ul>
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
