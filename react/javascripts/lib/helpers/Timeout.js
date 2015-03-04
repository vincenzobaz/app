
'use strict';

var nop = function() {};

function Timeout(maxTime /* ms */, onTimeUp, interval, onTick, lastTick) {
  this.timeLeft = maxTime;
  this.onTimeUp = onTimeUp || nop;
  this.interval = interval || 1000;
  this.onTick = onTick || nop;
  this.lastTick = (lastTick == null) ? false : !!lastTick;
}

Timeout.prototype = {

  id: null,

  start() {
    this.id = setInterval(this.tick.bind(this), this.interval);
  },

  stop() {
    clearInterval(this.id);
  },

  tick() {
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

};

module.exports = Timeout;
