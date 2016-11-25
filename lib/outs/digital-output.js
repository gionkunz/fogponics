const rpio = require('rpio');

function convert(value, inverse) {
  return (inverse ? !value : !!value) ? rpio.HIGH : rpio.LOW;
}

class DigitalOutput {
  constructor(pin, invert = false, initialState = false) {
    this.pin = pin;
    this.initialState = initialState;
    this.invert = invert;
    this.previousValue = null;
  }

  initialize()  {
    rpio.open(this.pin, rpio.OUTPUT, convert(this.initialState, this.invert));
  }

  update(value) {
    if (value !== this.previousValue) {
      rpio.write(this.pin, convert(value, this.invert));
      this.previousValue = value;
    }
  }

  close() {
    rpio.close(this.pin);
  }
}

module.exports = DigitalOutput;
