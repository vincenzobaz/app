
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    pluralize = require('pluralize'),
    shapes = require('../shapes'),
    Post = require('../Post'),
    timeAgo = require('../../helpers/timeAgo');
    // debug = require('debug')('Timeline');

var Timeline = React.createClass({

  propTypes: {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    subject: shapes.post.isRequired,
    max: React.PropTypes.number.isRequired,
    min: React.PropTypes.number.isRequired,
    step: React.PropTypes.number.isRequired,
    default: React.PropTypes.number.isRequired,
    unit: React.PropTypes.string.isRequired,
    onDone: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      ago: this.props.default
    };
  },

  componentWillReceiveProps(props) {
    if (props.id === this.props.id) {
      return;
    }

    this.setState(this.getInitialState());
  },

  render() {
    var q = this.props;
    return (
      <div className="question-time">
        <h4>{q.title}</h4>
        <Post post={q.subject} />
        <input type="range" min={q.min} max={q.max} step={q.step} value={this.state.ago} onChange={this._onChange} />
        <Button onClick={this._onSubmit}>{this.getButtonText(q, this.state.ago)}</Button>
      </div>
    );
  },

  getButtonText(q, ago) {
    return pluralize(q.unit, ago, true) + ' ago (' + timeAgo(ago, q.unit) + ')';
  },

  _onChange(e) {
    this.setState({
      ago: +e.target.value
    });
  },

  _onSubmit() {
    this.props.onDone({
      ago: this.state.ago
    });
  }

});

module.exports = Timeline;
