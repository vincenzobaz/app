
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    pluralize = require('pluralize'),
    { agoToDate, dateToAgo } = require('Time');
    // debug = require('debug')('Timeline');

var Timeline = React.createClass({

  propTypes: {
    type: React.PropTypes.string.isRequired,
    subject: R.Shapes.post.isRequired,
    max: React.PropTypes.string.isRequired,
    min: React.PropTypes.string.isRequired,
    step: React.PropTypes.number.isRequired,
    default: React.PropTypes.string.isRequired,
    unit: React.PropTypes.string.isRequired,
    onDone: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      ago: this.toRelative(this.props.default)
    };
  },

  componentWillReceiveProps(props) {
    this.replaceState({
      ago: this.toRelative(props.default)
    });
  },

  toRelative(date) {
    return dateToAgo(date, this.props.unit.toLowerCase());
  },

  propsToRelative() {
    return {
      min: this.toRelative(this.props.min),
      max: this.toRelative(this.props.max),
      default: this.toRelative(this.props.default),
    };
  },

  render() {
    const rel = this.propsToRelative();

    return (
      <div className="question question-time">
        <h4>{R.getQuestionTitleByType(this.props.type)}</h4>
        <div className="question-subject">
          <R.Post post={this.props.subject} />
        </div>
        <div className="question-input">
          <input
            type="range"
            max={rel.min}
            min={rel.max}
            step={this.props.step}
            value={this.state.ago}
            onChange={this.onChange} />
          <Button onClick={this.onSubmit}>{this.getButtonText()}</Button>
        </div>
      </div>
    );
  },

  getButtonText() {
    return pluralize(this.props.unit.toLowerCase(), this.state.ago, true) + ' ago ' +
           '(' + agoToDate(this.state.ago, this.props.unit) + ')';
  },

  onChange(e) {
    this.setState({
      ago: +e.target.value
    });
  },

  onSubmit() {
    this.props.onDone({
      date: agoToDate(this.state.ago, this.props.unit, null)
    });
  }

});

Reminisce.Timeline = Timeline;
