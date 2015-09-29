
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button;

var MultipleChoice = React.createClass({

  propTypes: {
    type: React.PropTypes.string.isRequired,
    subject: R.Shapes.post.isRequired,
    choices: React.PropTypes.arrayOf(R.Shapes.choice).isRequired,
    onDone: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      selected: null
    };
  },

  render() {
    console.log(this.props);
    return (
      <div className="question question-multiplechoice">
        <h4>{R.getQuestionTitleByType(this.props.type)}</h4>
        <div className="question-subject grid-50">
          <R.Post post={this.props.subject} />
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
          <R.Prop {...choice} />
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

Reminisce.MultipleChoice = MultipleChoice;
