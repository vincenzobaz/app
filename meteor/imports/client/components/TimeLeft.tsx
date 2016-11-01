
import { WithTimeout } from './hoc/WithTimeout';
import { timerStyle }  from '../helpers/timerStyle';

interface TimeLeftProps {
  maxTime: number;
  timeLeft: number;
}

class InnerTimeLeft extends React.Component<TimeLeftProps, void> {

  constructor(props: TimeLeftProps) {
    super(props);
  }

  render() {
    const timeLeftRatio = this.props.timeLeft / this.props.maxTime;

    return (
      <div className='timer'>
        <i className='icon-time'></i>
        <span style={timerStyle(timeLeftRatio)}>{' '}</span>
      </div>
    );
  }

}

export const TimeLeft = WithTimeout(InnerTimeLeft);

