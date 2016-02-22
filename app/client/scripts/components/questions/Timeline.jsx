
'use strict';

import {Shapes} from '../../boot/helpers/shapes';
import {getQuestionTitleByType} from './../../boot/helpers/getQuestionTitleByType'
import {Post} from '../Post';
import { agoToDate, dateToAgo } from '../../boot/helpers/timeAgo';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    pluralize = require('pluralize')
    
    // debug = require('debug')('Timeline');

export const Timeline = React.createClass({

  propTypes: {
    type    : React.PropTypes.string.isRequired,
    subject : Shapes.post.isRequired,
    max     : React.PropTypes.string.isRequired,
    min     : React.PropTypes.string.isRequired,
    step    : React.PropTypes.number.isRequired,
    default : React.PropTypes.string.isRequired,
    unit    : React.PropTypes.string.isRequired,
    onDone  : React.PropTypes.func.isRequired
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
      min     : this.toRelative(this.props.min),
      max     : this.toRelative(this.props.max),
      default : this.toRelative(this.props.default),
    };
  },

  render() {
    console.log("We render timeline ", this.props);

    const rel = this.propsToRelative();

    return (
      <div className="question question-time">
        <h4>{getQuestionTitleByType(this.props.type)}</h4>
        <div className="question-subject">
          <Post post={this.props.subject} />
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
    const agoStr  = pluralize(this.props.unit.toLowerCase(), this.state.ago, true);
    const dateStr = agoToDate(this.props.default, this.state.ago, this.props.unit);

    return `${agoStr} ago (${dateStr})`;
  },

  onChange(e) {
    this.setState({
      ago: +e.target.value
    });
  },

  onSubmit() {
    this.props.onDone({
      date: agoToDate(this.props.default, this.state.ago, this.props.unit, null)
    });
  }

});

