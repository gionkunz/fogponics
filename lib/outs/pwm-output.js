const rpio = require('rpio');

class PwmOutput {
  constructor(pin, pwmClockDivider = 16, pwmRange = 1024) {
    this.pin = pin;
    this.pwmClockDivider = pwmClockDivider;
    this.pwmRange = pwmRange;
    this.previousValue = null;
  }

  initialize()  {
    rpio.open(this.pin, rpio.PWM);
    rpio.pwmSetClockDivider(this.pwmClockDivider);
    rpio.pwmSetRange(this.pin, this.pwmRange);
  }

  update(value) {
    if (value !== this.previousValue) {
      rpio.pwmSetData(this.pin, value);
      this.previousValue = value;
    }
  }

  close() {
    rpio.open(this.pin, rpio.OUTPUT, rpio.LOW);
  }
}

module.exports = PwmOutput;
