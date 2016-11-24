const rpio = require('rpio');

class DigitalOutput {
  constructor(pin, initialState = false) {
    this.pin = pin;
    this.initialState = initialState;
  }

  initialize()  {
    this.update(this.initialState);
  }

  update(value) {
    rpio.write(this.pin, value ? rpio.HIGH : rpio.LOW);
  }

  close() {
    rpio.close(this.pin);
  }
}

module.exports = DigitalOutput;
