
const debug = require('debug')('ModalManager');

const EventEmitter = require('events').EventEmitter;

const nop = () => {};

class ModalManager extends EventEmitter {

  showElement(element, props = {}, onDismiss = nop) {
    this.emit('modal', {
      element,
      props,
      onDismiss
    });
  }

  showModal(modal) {
    this.emit('modal', modal);
  }

}

Reminisce.ModalManager = new ModalManager();

