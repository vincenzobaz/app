///Greatly inspired by https://www.npmjs.com/package/timer-machine

import {EventEmitter} from "events";
var timers = {};

interface Timers {
  [index: string]: QuestionTimer;
}

export class QuestionTimer extends EventEmitter {

  static timers: Timers[] = [];

  private _total: number;
  private _start: any;

  constructor(start: any = null) {
    super();
    EventEmitter.call(this)
    this._start = start;
    this._total = 0;
    if (start) {
      this.start();
    }
  }

  start(): boolean {
    if (this.isStopped()) {
      this._start = QuestionTimer.now();
      this.emit('start');
      return true
    }
    return false;
  }
  
  stop(): boolean {
    if (this.isStarted()) {
      this._total += this.timerFromStart();
      this._start = null;
      this.emit('stop');
      return true;
    }
    return false;
  }

  isStopped(): boolean {
    return this._start == null;
  }

  static now(): number {
    return new Date().getTime();
  }

  static get(name: string): QuestionTimer {
    if (!timers[name]) {
      timers[name] = new QuestionTimer();
    }
    return timers[name];
  }

  static destory(name: string) {
    if (timers[name]) {
      return delete timers[name];
    }
    return false;
  }
  
  isStarted() {
    return !this.isStopped();
  }
  
  timerFromStart(): number {
    return this.isStarted() ? QuestionTimer.now() - this._start : 0;
  }
  
  time() {
    let total = this._total;
    total += this.timerFromStart();
    return total;
  }
  
  timer() {
    let time = this.time();
    this.emit('time', time);
    return time;
  }
  
  emitTime() {
    let time = this.time();
    this.emit('time', time);
    return time;
  }
  
  toggle() {
    return this.start() || this.stop();
  }
  
  public toString(): string {
    return this.time() + 'ms';
  }
  

  valueOf(): number {
    return this.time();
  }
  
  
}
