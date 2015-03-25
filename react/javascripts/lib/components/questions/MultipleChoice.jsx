
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    Prop = require('../Prop'),
    shapes = require('../shapes'),
    Post = require('../Post');

var MultipleChoice = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    post: shapes.post.isRequired,
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
        <Post post={this.props.post} />
        <ul className='answers avatar-answers'>
          {this.props.choices.map(this._renderChoice)}
        </ul>
      </div>
    );
  },

  _renderChoice(choice, index) {
    return (
      <li key={`${Math.round(Math.random() * 1000) + '-' + choice.value}`}>
        <Button onClick={this._onChoice(choice, index)}>
          <Prop type={this.props.propType} text={choice.text} value={choice.value} />
        </Button>
      </li>
    );
  },

  _onChoice(choice, index) {
    return (e) => {
      this.props.onDone({
        choice: index
      });
    };
  }

});

module.exports = MultipleChoice;
