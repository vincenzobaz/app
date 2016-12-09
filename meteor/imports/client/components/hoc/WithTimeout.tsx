
import { Component, ComponentClass } from 'react';
import { Timeout }                   from '../../helpers/Timeout';

interface InnerProps {
  timeLeft: number;
  maxTime: number;
}

interface WithTimeoutProps {
  maxTime: number;
  onTimeUp: Function;
}

interface WithTimeoutState {
  timeLeft: number;
  timeUp: boolean;
}

export function WithTimeout<P>(InnerComponent: ComponentClass<P & InnerProps>): ComponentClass<P & WithTimeoutProps> {
  return class WithTimeoutWrapper extends Component<P & WithTimeoutProps, WithTimeoutState> {

    private timeout: Timeout;

    constructor(props) {
      super(props);

      this.state = {
        timeLeft: props.maxTime,
        timeUp: props.maxTime === 0
      };
    }

    render() {
      const props = this.props as P;

      return <InnerComponent timeLeft={this.state.timeLeft}
                             maxTime={this.props.maxTime}
                             {...this.props} />;
    }

    componentWillMount(): void {
      this.timeout = new Timeout(
        this.props.maxTime * 1000,
        this.onTimeUp.bind(this),
        1000,
        this.tick.bind(this),
        true
      );
    }

    componentDidMount(): void {
      this.timeout.start();
    }

    componentWillUnmount(): void {
      this.stopTimer();
    }

    tick(timeLeft: number): void {

      this.setState({
        timeLeft: timeLeft / 1000,
        timeUp: this.state.timeUp
      });
    }

    onTimeUp(): void {
      this.setState({
        timeUp: true,
        timeLeft: 0
      });

      this.props.onTimeUp();
    }

    isTimeUp(): boolean {
      return this.state.timeUp;
    }

    stopTimer(): void {
      if (this.timeout != null) {
        this.timeout.stop();
      }
    }
  }

}

