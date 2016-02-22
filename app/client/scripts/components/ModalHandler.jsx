
import {Shapes} from './../boot/helpers/shapes';

const React = require('react');
const OverlayMixin = require('react-bootstrap').OverlayMixin;
const debug = require('debug')('ModalHandler');

export const ModalHandler = React.createClass({

  mixins: [OverlayMixin],
  
  propTypes: {
    manager: Shapes.EventEmitter
  },
  
  getInitialState() {
    return {
      modal: null,
      isOpen: false
    };
  },
  
  componentDidMount() {
    this.props.manager.on('modal', this.onNewModal);
    debug('subscribed');
  },
  
  componentWillUnmount() {
    this.props.manager.off('modal', this.onNewModal);
    debug('unsubscribed');
  },
  
  onNewModal(modal) {
    this.setState({
      modal: modal,
      isOpen: true
    });
  },
  
  render() {
    return <noscript />;
  },
  
  renderOverlay() {
    if (!this.state.isOpen || this.state.modal == null) {
      return <noscript />;
    }
  
    const modal     = this.state.modal;
    const Modal     = modal.element;
    const props     = modal.props;
    const onDismiss = modal.onDismiss;
  
    return <Modal onRequestHide={this.dismiss(onDismiss)} {...props} />;
  },
  
  dismiss(callback) {
    return () => {
      this.setState({
        modal: null,
        isOpen: false
      });
  
      if (typeof callback === 'function') {
        callback();
      }
    };
  }

});
