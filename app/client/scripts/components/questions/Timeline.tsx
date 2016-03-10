
'use strict';
import {getQuestionTitleByType} from './../../boot/helpers/getQuestionTitleByType'
import {Post} from '../facebook/Post';
import { agoToDate, dateToAgo } from '../../boot/helpers/timeAgo';
import {SubjectType} from "../../../../common/models/questions/SubjectType";
import {Subject} from "../../../../common/models/questions/Subject";
import {TimelineUnit} from "../../../../common/models/questions/TimelineUnit";
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

  constructor(props: TimelineProps) {
    super(props);
    this.state = {
      ago: this.toRelative(this.props.initialDate)
    };
  }
  

  componentWillReceiveProps(props) {
    this.setState({
      ago: this.toRelative(props.default)
    });
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
    const dateStr = agoToDate(this.props.initialDate, this.state.ago, this.props.unit);

    return `${agoStr} ago (${dateStr})`;
  }

  onChange(e) {
    this.setState({
      ago: +e.target.value
    });
  }

  onSubmit() {
    this.props.onDone({
      date: agoToDate(this.props.initialDate, this.state.ago, this.props.unit, null)
    });
  }

}

