
'use strict';

import {Timeout} from './../helpers/Timeout';

export const TimeoutMixin = {

  timeout: null,

  componentWillMount() {
    this.timeout = new Timeout(
      this.props.maxTime * 1000,
      this.onTimeUp.bind(this), 1000, this.tick.bind(this), true
    );
  },

  componentDidMount() {
    this.timeout.start();
  },

  componentWillUnmount() {
    this.stopTimer();
  },

  tick(timeLeft) {
    this.setState({
      timeLeft: timeLeft / 1000
    });
  },

  onTimeUp() {
    this.setState({
      timeUp: true,
      timeLeft: 0
    });

    this.props.onTimeUp();
  },

  isTimeUp() {
    return this.state.timeUp;
  },

  stopTimer() {
    if (this.timeout != null) {
      this.timeout.stop();
    }
  }

};


