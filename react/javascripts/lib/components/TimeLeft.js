
/** @jsx React.DOM */

'use strict';

var React = require('react'),
    TimeoutMixin = require('../mixins/TimeoutMixin'),
    timerStyle = require('../helpers/timerStyle');

var TimeLeft = React.createClass({

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

module.exports = TimeLeft;

