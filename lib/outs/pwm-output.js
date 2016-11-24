const rpio = require('rpio');

class PwmOutput {
  constructor(pin, pwmClockDivider = 16, pwnRange = 1024) {
    this.pin = pin;
    this.pwmClockDivider = pwmClockDivider;
    this.pwmRange = pwnRange;
  }

  initialize()  {
    rpio.open(this.pin, rpio.PWM);
    rpio.pwmSetClockDivider(this.pwmClockDivider);
    rpio.pwmSetRange(ledPin, this.pwmRange);
  }

  update(value) {
    rpio.pwmSetData(this.pin, value);
  }

  close() {
    rpio.close(this.pin);
  }
}

module.exports = PwmOutput;
