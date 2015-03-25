
'use strict';

var React = require('react');

// FIXME: Use react-bootstrap's Tooltip component instead.

var Tooltip = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    animation: React.PropTypes.bool,
    html: React.PropTypes.bool,
    placement: React.PropTypes.string,
    selector: React.PropTypes.string,
    trigger: React.PropTypes.string,
    container: React.PropTypes.string,
    delay: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.shape({
        show: React.PropTypes.number,
        hide: React.PropTypes.number
      })
    ])
  },

  getDefaultProps() {
    return {
      delay: {
        show: 500
      }
    };
  },

  componentDidMount() {
    $(this.getDOMNode()).tooltip(this.props);
  },

  componentWillUnmount() {
    $(this.getDOMNode()).tooltip('destroy');
  },

  render () {
    return this.props.children;
  }
});

module.exports = Tooltip;
