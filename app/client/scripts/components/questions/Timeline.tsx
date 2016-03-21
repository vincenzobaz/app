
'use strict';
import {getQuestionTitleByType} from './../../boot/helpers/getQuestionTitleByType'
import {Post} from '../facebook/Post';
import {agoToDate, dateToAgo, getDateString, addUnitsToDate} from '../../boot/helpers/timeAgo';
import {SubjectType} from "../../../../common/models/questions/common/SubjectType";
import {Subject} from "../../../../common/models/questions/common/Subject";
import {TimelineUnit} from "../../../../common/models/questions/timeline/TimelineUnit";
import {Button} from "react-bootstrap";
import {QuestionProps} from "./QuestionProps";
import pluralize from "pluralize";
// let pluralize: any = require("pluralize");



interface TimelineProps extends QuestionProps{
  max: string;
  min: string;
  step: number;
  initialDate: string;
  unit: TimelineUnit;
}

interface TimelineState {
  ago: number;
}

export class Timeline extends React.Component<TimelineProps, TimelineState> {

  private currentDate: string;
  
  constructor(props: TimelineProps) {
    super(props);
    let ago = this.toRelative(props.initialDate);
    this.state = {
      ago: this.toRelative(this.props.initialDate)
    };
    this.currentDate = addUnitsToDate(props.initialDate, ago, props.unit);
  }
  

  componentWillReceiveProps(props: TimelineProps) {
    this.props = props;
    let ago = this.toRelative(props.initialDate);
    this.setState({
      ago: ago
    });
    this.currentDate = addUnitsToDate(props.initialDate, ago, props.unit);
  }


  toRelative(date) {
    return dateToAgo(date, this.props.unit.toString().toLowerCase());
  }

  propsToRelative() {
    return {
      min     : this.toRelative(this.props.min),
      max     : this.toRelative(this.props.max),
      initialDate : this.toRelative(this.props.initialDate),
    };
  }

  render() {
    const rel = this.propsToRelative();
    const title = getQuestionTitleByType(this.props.type);
    const subject = this.props.subject;
    const step = this.props.step;
    const value = this.state.ago.toString();
    const buttonText = this.getButtonText();

    return (
      <div className="question question-time">
        <h4>{title}</h4>
        <div className="question-subject">
          <Post post={subject} />
        </div>
        <div className="question-input">
          <input
            type="range"
            max={rel.min}
            min={rel.max}
            step={this.props.step}
            value={this.state.ago.toString()}
            onChange={this.onChange.bind(this)} />
          <Button onClick={this.onSubmit.bind(this)}>{this.getButtonText()}</Button>
        </div>
      </div>
    );
  }

  getButtonText() {
    const agoStr  = pluralize(this.props.unit.toString().toLowerCase(), this.state.ago, true);
    const dateStr = agoToDate(this.currentDate, this.state.ago, this.props.unit);
    return `${agoStr} ago (${dateStr})`;
  }

  onChange(e) {
    this.setState({
      ago: +e.target.value
    });
  }

  onSubmit() {
    this.props.onDone({
      date: agoToDate(this.currentDate, this.state.ago, this.props.unit, null)
    });
  }

}

