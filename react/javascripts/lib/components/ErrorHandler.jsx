
'use strict';

var React = require('react');
var NetworkErrorModal = require('./modals/NetworkErrorModal');
var GenericErrorModal = require('./modals/GenericErrorModal');
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var shapes = require('./shapes');

var ErrorHandler = React.createClass({

  mixins: [OverlayMixin],

  propTypes: {
    store: shapes.EventEmitter
  },

  interval: null,

  modals: {
    Generic: GenericErrorModal,
    Network: NetworkErrorModal
  },

  getInitialState() {
    return {
      error: null,
      pendingErrors: [],
      isModalOpen: false
    };
  },

  componentWillMount() {
    this.props.store.on('error', this.onNewError);
    this.interval = setInterval(this.showNextError, 1000);
  },

  componentWillUnmount() {
    this.props.store.off('error', this.onNewError);
    clearInterval(this.interval);
  },

  onNewError(e) {
    this.state.pendingErrors.push(e);
    this.showNextError();
  },

  showNextError() {
    if (!this.state.isModalOpen && this.hasPending()) {
      var error = this.state.pendingErrors.shift();
      this.setState({
        error: error,
        isModalOpen: true
      });
    }
  },

  dismiss() {
    this.setState({
      error: null,
      isModalOpen: false
    });
  },

  hasPending() {
    return this.state.pendingErrors.length > 0;
  },

  render() {
    return <noscript />;
  },

  renderOverlay: function () {
    if (!this.state.isModalOpen) {
      return <noscript />;
    }

    var Modal = this.modals[this.state.error.type];

    if (typeof Modal !== 'function') {
      return <noscript />;
    }

    return <Modal onRequestHide={this.dismiss} error={this.state.error} />;
  }

});

module.exports = ErrorHandler;
