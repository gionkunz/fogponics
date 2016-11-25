const rpio = require('rpio');
const updateRate = 30;
const data = require('../data').data;
const PwmOutput = require('./pwm-output');
const DigitalOutput = require('./digital-output');

const outs = {
  led: new PwmOutput(12),
  fog: new DigitalOutput(16, true),
  fan: new DigitalOutput(18, true)
};

const initialize = () => {
  rpio.init({
    gpiomem: false
  });
  Object.keys(outs).forEach((outKey) => outs[outKey].initialize());
};
const updateInterval =
  setInterval(() =>
    Object.keys(outs).forEach((outKey) => outs[outKey].update(data[outKey])), updateRate);
const close = () => {
  Object.keys(outs).forEach((outKey) => outs[outKey].close());
  clearInterval(updateInterval);
};

process.on('SIGINT', close);

module.exports = {
  initialize
};
