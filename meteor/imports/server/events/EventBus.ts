
import {EventEmitter} from 'events';

export class EventType<A> {

  private _name: string;

  public constructor(name: string) {
    this._name = name;
  }

  public getName(): string {
    return this._name;
  }

}

export abstract class Event<A> {

  private _type: EventType<A>;
  private _data: A;

  constructor(eventType: EventType<A>, data: A) {
    this._type = eventType;
    this._data = data;
  }

  public getType(): EventType<A> {
    return this._type;
  }

  public getData(): A {
    return this._data;
  }

}

export interface Listener<A> {
  (data: A): void;
}

export class EventBus {

  private bus: EventEmitter = new EventEmitter();

  private debug: boolean = false;

  constructor(debug: boolean = false) {
    this.debug = debug;
  }

  public emit<A>(event: Event<A>): boolean {
    if (this.debug) {
      logger.debug(`[EventBus] emit: ${event.getType().getName()}`, event.getData());
    }

    return this.bus.emit(event.getType().getName(), event);
  }

  public on<A>(eventType: EventType<A>, listener: Listener<Event<A>>): EventBus {
    this.bus.on(eventType.getName(), listener);
    return this;
  }

  public off<A>(eventType: EventType<A>, listener: Listener<Event<A>>): EventBus {
    this.bus.removeListener(eventType.getName(), listener);
    return this;
  }

  public setDebug(debug: boolean): void {
    this.debug = debug;
  }

}

