import {getQuestionTitleByType} from '../../helpers/getQuestionTitleByType'
import {Post} from '../facebook/Post';
import {Prop} from '../Prop';
import {Choice} from "../../../../common/models/questions/multiplechoice/Choice";
import {Button} from 'react-bootstrap';
import {QuestionProps} from "./QuestionProps";
import * as _ from 'lodash';
import {MultipleChoiceAnswer} from "../../../../server/services/verification/services/MultipleChoiceVerificationService";

interface MultipleChoiceProps extends QuestionProps {
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
    const title = getQuestionTitleByType(this.props.type);

    return (
        <div className="question question-multiplechoice">
          <h4>{title}</h4>
          <div className="question-subject">
            <Post post={this.props.subject}/>
          </div>
          <div className="question-input">
            <ul className='answers avatar-answers'>
              {this.props.choices.map(this.renderChoice.bind(this))}
            </ul>
          </div>
        </div>
    );
  }


  renderChoice(choice, index) {
    let bsStyle = "default";
    let className = null;
    if (this.props.userAnswer != null && this.props.answer != null) {
      if (index == this.props.answer) {
        bsStyle = null;
        className = "button-correct";
      } else if (index == this.props.userAnswer.data.choice) {
        bsStyle = null;
        className = "button-wrong";
      }
    }

    return (
        <li key={_.uniqueId()}>
          <Button className={className} onClick={this.onChoice.bind(this, choice, index)}>
            <Prop {...choice} />
          </Button>
        </li>
    );
  }

  onChoice(choice, index) {
    if (this.props.userAnswer == null) {
      this.props.onDone({
        choice: index
      });
    }
  }


}

