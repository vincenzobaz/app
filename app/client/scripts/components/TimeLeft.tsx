
'use strict';

import {TimeoutMixin} from './../boot/mixins/TimeoutMixin';
import {timerStyle} from './../boot/helpers/timerStyle';
import * as ReactMixin from 'react-mixin';


interface TimeLeftProps {
  maxTime: number;
  onTimeUp: Function;
}

interface TimeLeftState {
  timeLeft: number;
}

@ReactMixin.decorate(TimeoutMixin)
export class TimeLeft extends React.Component<TimeLeftProps, TimeLeftState> {

  constructor(props: TimeLeftProps) {
    super(props);

    this.state = {
      timeLeft: this.props.maxTime
    }
  }

  render() {
    const timeLeftRatio = this.state.timeLeft / this.props.maxTime;

    return (
      <div className='timer'>
        <i className='icon-time'></i>
        <span style={timerStyle(timeLeftRatio)}>{' '}</span>
      </div>
    );
  }

}

