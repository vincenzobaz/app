
'use strict';

import {getQuestionTitleByType} from './../../boot/helpers/getQuestionTitleByType'
import {Post} from './../facebook/Post';
import {Prop} from './../Prop';
import {SubjectType} from "../../../../common/models/questions/SubjectType";
import {Subject} from "../../../../common/models/questions/Subject";
import {Choice} from "../../../../common/models/questions/Choice";
import {Button} from 'react-bootstrap';
import {QuestionProps} from "./QuestionProps";

interface MultipleChoiceProps extends QuestionProps{
  choices: Choice[];
}

interface MultipleChoiceState {
  selected: any;
}

export class MultipleChoice extends React.Component<MultipleChoiceProps,{}> {

  constructor(props: MultipleChoiceProps) {
    super(props);
    this.state = {
      selected: null
    };
  }

  render() {
    return (
      <div className="question question-multiplechoice">
        <h4>{getQuestionTitleByType(this.props.type)}</h4>
        <div className="question-subject grid-50">
          <Post post={this.props.subject} />
        </div>
        <div className="question-input grid-50">
          <ul className='answers avatar-answers'>
            {this.props.choices.map(this.renderChoice.bind(this))}
          </ul>
        </div>
      </div>
    );
  }

  renderChoice(choice, index) {
    return (
      <li key={`${Math.round(Math.random() * 100000)}`}>
        <Button onClick={this.onChoice(choice, index).bind(this)}>
          <Prop {...choice} />
        </Button>
      </li>
    );
  }

  onChoice(choice, index) {
    return (e) => {
      this.props.onDone({
        choice: index
      });
    };
  }

}

