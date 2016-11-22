const rpio = require('rpio');

const ledPin = 12;
const ledClockDivider = 16;
const ledPwmRange = 1024;

const initialize = () =>  {
  rpio.open(ledPin, rpio.PWM);
  rpio.pwmSetClockDivider(ledClockDivider);
  rpio.pwmSetRange(ledPin, ledPwmRange);
};
const update = (value) => rpio.pwmSetData(ledPin, value);
const close = () => rpio.close(ledPin);

module.exports = {
  initialize,
  update,
  close
};
