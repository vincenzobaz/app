
import {getQuestionTitleByType} from './../../boot/helpers/getQuestionTitleByType'
import {Post} from './../facebook/Post';
import {Prop} from './../Prop';
import {Choice} from "../../../../common/models/questions/multiplechoice/Choice";
import {Button} from 'react-bootstrap';
import {QuestionProps} from "./QuestionProps";
import * as _ from 'lodash';
import {MultipleChoiceAnswer} from "../../../../server/services/verification/services/MultipleChoiceVerificationService";

interface MultipleChoiceProps extends QuestionProps{
  choices: Choice[];
  answered?: boolean;
  correct: number;
  selected: number;
  answer?: number;
  userAnswer?: MultipleChoiceAnswer;
}

interface MultipleChoiceState {
  selected: any;
}

export class MultipleChoice extends React.Component<MultipleChoiceProps, MultipleChoiceState > {

  constructor(props: MultipleChoiceProps) {
    super(props);
    this.state = {
      selected: null
    };
  }

  render() {
    if (this.props.userAnswer) {
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
      )
    }
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
    //FIXME: The button classes should use the bootsrap-variants mixin
    let className = "";
    if (this.props.userAnswer && this.props.answer && index == this.props.answer) {
        className = "btn-success";
    } else if (this.props.userAnswer && this.props.answer && index == this.props.userAnswer.data.choice) {
        className = "btn-error";
    }
    return (
      <li key={_.uniqueId()}>
        <Button className={className}  onClick={this.onChoice(choice, index).bind(this)}>
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

