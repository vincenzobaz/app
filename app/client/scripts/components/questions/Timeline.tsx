import {getQuestionTitleByType} from "./../../helpers/getQuestionTitleByType";
import {Post} from "../facebook/Post";
import {TimelineUnit, TIMELINE_UNIT} from "../../../../common/models/questions/timeline/TimelineUnit";
import {Button, ButtonGroup} from "react-bootstrap";
import {QuestionProps} from "./QuestionProps";
import {Moment} from "moment/moment";
import {TimelineAnswer} from "../../../../common/models/questions/answers/TimelineAnswer";
const moment = require('moment');


interface TimelineProps extends QuestionProps {
  dates: Date[];
  step: number;
  unit: TimelineUnit;
  answer?: string;
  before: number;
  after: number;
  userAnswer?: TimelineAnswer;
}


export class Timeline extends React.Component<TimelineProps, {} > {

  constructor(props: TimelineProps) {
    super(props);
  }


  componentWillReceiveProps(props: TimelineProps) {
    this.props = props;
  }
  


  render() {
    const unit = this.props.unit;
    const title = getQuestionTitleByType(this.props.type);
    const subject = this.props.subject;
    const before = this.props.before;
    const after = this.props.after;
    
    return (
        <div className="question question-time">
          <h4>{title}</h4>
          <div className="question-subject">
            <Post post={subject}/>
          </div>
          <div className="question-input">
            <ButtonGroup vertical>
              {this.props.dates.map((date: Date) => {
              return this.createButton(date, before, after, unit)
          })}
            </ButtonGroup>
          </div>
        </div>
    );
  }
  
  createButton(date: Date, before: number, after: number, unit: TimelineUnit) {

    const format = "MMMM Do YYYY";
    let className = "default";
    if (this.props.userAnswer && this.props.answer) {
      const userAnswer: Moment = moment(this.props.userAnswer.data.date);
      const answer: Moment = moment(this.props.answer);

      let beforeDate: Moment = moment(date);
      let afterDate: Moment = moment(date);
      beforeDate.subtract(before, unit);
      afterDate.add(after, unit);
      if (this.inBetweenInclusive(userAnswer, beforeDate, afterDate, unit) && this.inBetweenInclusive(answer, beforeDate, afterDate, unit) ) {
        className = "button-correct";
      } else if (this.inBetweenInclusive(userAnswer, beforeDate, afterDate, unit)) {
        className = "button-wrong";
      } else if (this.inBetweenInclusive(answer, beforeDate, afterDate, unit)) {
        className = "button-correct";
      }
    }
    const text = this.getButtonTextForMoment(date, unit, before, after);
    return(
        <Button className={className} key={_.uniqueId()}
                onClick={this.onSubmit.bind(this, date)}>{text}</Button>
    )
  }

  inBetweenInclusive(date: Moment, from: Moment, until: Moment, unit: TimelineUnit): boolean {
    return date.isSameOrAfter(from, unit) && date.isSameOrBefore(until, unit);
  }


  getButtonTextForMoment(date: Date, unit: TimelineUnit, before?: number, after?: number) {
    var format = "YYYY";
    let beforeDate = moment(_.cloneDeep(date));
    let afterDate = moment(_.cloneDeep(date));
    switch (unit) {
      case TIMELINE_UNIT.Year:
        format = "YYYY";
        break;
      case TIMELINE_UNIT.Month:
        format = "MMMM YYYY";
        break;
      case TIMELINE_UNIT.Week:
        format = "ddd, MMMM Do YYYY";
        break;
      case TIMELINE_UNIT.Day:
        format = "ddd, MMMM Do YYYY";
        break;
    }
    if (before >= 1 || after >= 1) {
      beforeDate.subtract(before, unit);
      afterDate.add(after, unit);
      if (unit == TIMELINE_UNIT.Week) {
        afterDate.add(1, 'week').subtract(1, 'day');
      }
      return (<div className='timeline-date-container'>
        <div className="timeline-date-left"> {beforeDate.format(format)}</div>
        <div className="timeline-date-separator"> -</div>
        <div className="timeline-date-right">{afterDate.format(format)}</div>
      </div>);
    } else {
      return (<div>{moment(date).format(format)}</div>);

    }

  }

  onSubmit(date: Date) {
    if (this.props.userAnswer == null) {
      this.props.onDone(
          {
            date: date
          }
      );
    }
  }

}

