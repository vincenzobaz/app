
'use strict';

var React = require('react');

var TimeLeft = React.createClass({

  propTypes: {
    maxTime: React.PropTypes.number.isRequired, /* in seconds */
    onTimeUp: React.PropTypes.func.isRequired
  },

  mixins: [R.TimeoutMixin],

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
          <span style={R.timerStyle(timeLeftRatio)}>{' '}</span>
      </div>
    );
  }

});

Reminisce.TimeLeft = TimeLeft;

