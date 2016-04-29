
import {EventEmitter} from 'events';

const nop = () => {};

class _ModalStore extends EventEmitter {

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

  off(event: string, listener: Function): EventEmitter {
    console.error("Not implemented yet");
    return this;
  }

}

export const ModalStore = new _ModalStore();

