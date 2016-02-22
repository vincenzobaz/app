
'use strict';

import {Shapes} from './../../boot/helpers/shapes.jsx';
import {getQuestionTitleByType} from './../../boot/helpers/getQuestionTitleByType.jsx'
import {Post} from './../Post.jsx';
import {Prop} from './../Prop.jsx';

var React = require('react'),
    Button = require('react-bootstrap').Button;

export const MultipleChoice = React.createClass({

  propTypes: {
    type: React.PropTypes.string.isRequired,
    subject: Shapes.post.isRequired,
    choices: React.PropTypes.arrayOf(Shapes.choice).isRequired,
    onDone: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      selected: null
    };
  },

  render() {
    console.log("We render multiple choice", this.props);
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
    console.log("rendering choice", choice);
    return (
      <li key={`${Math.round(Math.random() * 100000)}`}>
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

