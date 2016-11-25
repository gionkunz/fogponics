const signal = require('./signal');

const data = {
  led: new signal.ScheduleSignalGenerator([{
    text: 'after 5th minute before 6th minute',
    signalGenerator: new signal.MovingSignalGenerator(0, 1024, 60000)
  }, {
    text: 'after 6th minute before 9th minute',
    signalGenerator: new signal.ConstantSignalGenerator(1024)
  }, {
    text: 'after 9th minute before 10th minute',
    signalGenerator: new signal.MovingSignalGenerator(1024, 0, 60000)
  }]),
  fan: new signal.ConstantSignalGenerator(0),
  fog: new signal.ConstantSignalGenerator(0)
};

module.exports = {
  data
};
