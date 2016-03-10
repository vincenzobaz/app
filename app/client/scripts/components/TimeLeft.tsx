
'use strict';

import {TimeoutMixin} from './../boot/mixins/TimeoutMixin';
import {timerStyle} from './../boot/helpers/timerStyle';
import * as reactMixin from 'react-mixin';


interface TimeLeftProps {
  maxTime: number;
  onTimeUp: Function;
}

interface TimeLeftState {
  timeLeft: number;
}

@reactMixin.decorate(TimeoutMixin)

export class TimeLeft extends React.Component<TimeLeftProps, TimeLeftState> {
  
  constructor(props: TimeLeftProps) {
    super(props);
    this.state = {
      timeLeft: this.props.maxTime
    }
  }


  render() {
    var timeLeftRatio = this.state.timeLeft / this.props.maxTime;

    return (
      <div className='timer'>
          <i className='icon-time'></i>
          <span style={timerStyle(timeLeftRatio)}>{' '}</span>
      </div>
    );
  }

}

