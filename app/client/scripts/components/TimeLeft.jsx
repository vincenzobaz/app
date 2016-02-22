
'use strict';

import {TimeoutMixin} from './../boot/mixins/TimeoutMixin';
import {timerStyle} from './../boot/helpers/timerStyle';

var React = require('react');

export const TimeLeft = React.createClass({

  propTypes: {
    maxTime: React.PropTypes.number.isRequired, /* in seconds */
    onTimeUp: React.PropTypes.func.isRequired
  },

  mixins: [TimeoutMixin],

  getInitialState() {
    return {
      timeLeft: this.props.maxTime
    };
  },

  render() {
    var timeLeftRatio = this.state.timeLeft / this.props.maxTime;

    return (
      <div className='timer'>
          <i className='icon-time'></i>
          <span style={timerStyle(timeLeftRatio)}>{' '}</span>
      </div>
    );
  }

});

