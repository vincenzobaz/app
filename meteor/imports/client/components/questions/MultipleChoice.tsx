import {getQuestionTitleByType} from '../../helpers/getQuestionTitleByType'
import {QUESTION_TYPE} from '../../../common/models/questions/common/QuestionType'
import {Post} from '../facebook/Post';
import {Prop} from '../Prop';
import {Choice} from "../../../common/models/questions/multiplechoice/Choice";
import {Button} from 'react-bootstrap';
import {QuestionProps} from "./QuestionProps";
import * as _ from 'lodash';
import {MultipleChoiceAnswer} from "../../../server/services/verification/services/MultipleChoiceVerificationService";
import {SubjectType} from "../../../common/models/questions/common/SubjectType";

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
    const type: SubjectType = this.props.type;
    const title: string = getQuestionTitleByType(type);

    return (
        <div className="question question-multiplechoice">
            <h4>{this.getIcon(type)} {title}</h4>
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

  getIcon(type: SubjectType) {
    const picsRoot = '/images/facebook/';
    let icon;
    switch (type) {
      case QUESTION_TYPE.MCWhoReactedToYourPostWithLIKE:
        icon = picsRoot + 'thumbup_120.png';
        break;
      case QUESTION_TYPE.MCWhoReactedToYourPostWithWOW:
        icon = picsRoot + 'oh_120.png';
        break;
      case QUESTION_TYPE.MCWhoReactedToYourPostWithHAHA:
        icon = picsRoot + 'lol_120.png';
        break;
      case QUESTION_TYPE.MCWhoReactedToYourPostWithLOVE:
        icon = picsRoot + 'love_120.png';
        break;
      case QUESTION_TYPE.MCWhoReactedToYourPostWithSAD:
        icon = picsRoot + 'cry_120.png';
        break;
      case QUESTION_TYPE.MCWhoReactedToYourPostWithANGRY:
        icon = picsRoot + 'grrr_120.png';
        break;
      default:
        icon = null;
        break;
    }

    if (icon != null) {
      return <img src={icon} alt="reaction" align="middle" width="60" height="60"/> ;
    } else {
      return null;
    }
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

