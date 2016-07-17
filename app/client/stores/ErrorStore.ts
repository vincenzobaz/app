
import {EventEmitter} from 'events';

export class ErrorStore extends EventEmitter {

  public register() {
    window.onerror = this.onGlobalError.bind(this);
    Promise.onPossiblyUnhandledRejection(this.onPromiseError.bind(this));
  }

  public emitTurnError(error): void {
    this.emit('error', {
      type: 'Turn',
      error: error
    });
  }

  public emitError(error): void {
    this.emit('error', {
      type: 'Generic',
      error: error
    });
  }

  private onGlobalError(msg, url, line, col, error): void {
    this.emitError(error);
  }

  private onPromiseError(error): void {
    this.emit('error', {
      type: 'Network',
      error: error
    });
  }

  public off(event: string, listener: Function): void {
    console.error('ErrorStore.off is not implemented yet');
  }

}

