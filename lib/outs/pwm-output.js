const rpio = require('rpio');

class PwmOutput {
  constructor(pin, pwmClockDivider = 16, pwmRange = 1024) {
    this.pin = pin;
    this.pwmClockDivider = pwmClockDivider;
    this.pwmRange = pwmRange;
  }

  initialize()  {
    rpio.open(this.pin, rpio.PWM);
    rpio.pwmSetClockDivider(this.pwmClockDivider);
    rpio.pwmSetRange(this.pin, this.pwmRange);
  }

  update(value) {
    rpio.pwmSetData(this.pin, value);
  }

  close() {
    rpio.close(this.pin);
  }
}

module.exports = PwmOutput;
