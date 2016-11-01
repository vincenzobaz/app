
const nop = () => {};

export class Timeout {

  private id: any;
  private timeLeft: number;

  constructor(
    private maxTime: number,          // milliseconds
    private onTimeUp: Function = nop,
    private interval: number = 1000,  // milliseconds
    private onTick: (timeLeft: number) => void = nop,
    private lastTick: boolean = false
  ) {
    this.timeLeft = maxTime;
  }

  start(): void {
    this.id = setInterval(() => this.tick(), this.interval);
  }

  stop(): void {
    clearInterval(this.id);
  }

  tick(): void {
    this.timeLeft -= this.interval;

    if (this.timeLeft <= 0) {
      if (this.lastTick) {
        this.onTick(0);
      }

      this.onTimeUp();
      this.stop();
    }
    else {
      this.onTick(this.timeLeft);
    }
  }

}

