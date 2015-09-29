
'use strict';

var React = require('react');

// Requires jQuery.fn.zoom() to be loaded.
// http://www.jacklmoore.com/zoom/

var Zoomable = React.createClass({

  propTypes: {
    url: React.PropTypes.string.isRequired,
    on: React.PropTypes.string,
    duration: React.PropTypes.number,
    target: React.PropTypes.string,
    touch: React.PropTypes.bool,
    magnify: React.PropTypes.number,
    callback: React.PropTypes.func,
    onZoomIn: React.PropTypes.func,
    onZoomOut: React.PropTypes.func
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.url !== nextProps.url;
  },

  enableZoom() {
    $(this.getDOMNode()).zoom(this.props);
  },

  destroyZoom() {
    $(this.getDOMNode()).trigger('zoom.destroy');
  },

  componentWillUpdate() {
    this.destroyZoom();
  },

  componentDidUpdate() {
    this.enableZoom();
  },

  componentDidMount() {
    this.enableZoom();
  },

  componentWillUnmount() {
    this.destroyZoom();
  },

  render() {
    return this.props.children;
  }
});

Reminisce.Zoomable = Zoomable;
