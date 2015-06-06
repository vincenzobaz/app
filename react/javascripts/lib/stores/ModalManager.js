
const debug = require('debug')('ModalManager');

const EventEmitter = require('events').EventEmitter;

const nop = () => {};

class ModalManager extends EventEmitter {

  showElement(element, props = {}, onDismiss = nop) {
    debug('showElement', element, props);

    this.emit('modal', {
      element,
      props,
      onDismiss
    });
  }

  showModal(modal) {
    debug('showModal', modal.element, modal.props);

    this.emit('modal', modal);
  }

}

module.exports = new ModalManager();

