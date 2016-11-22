const rpio = require('rpio');
const updateRate = 30;
const data = require('./data').data;

const outs = {
  led: require('./led')
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
