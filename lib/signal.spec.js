const signal = require('./signal');
const assert = require('assert');

describe('Signal', () => {
  describe('ConstantSignalGenerator', () => {
    it('should always return same constant value', () => {
      const constantSignal = new signal.ConstantSignalGenerator(0);
      assert.equal(constantSignal.getValue(0), 0);
      assert.equal(constantSignal.getValue(1000), 0);
    });
  });

  describe('MovingSignalGenerator', () => {
    it('should return startValue on lower range deviation', () => {
      const movingSignal = new signal.MovingSignalGenerator(0, 10, 100);
      movingSignal.reset(50);
      assert.equal(movingSignal.getValue(49), 0);
    });

    it('should return endValue on upper range deviation', () => {
      const movingSignal = new signal.MovingSignalGenerator(0, 10, 100);
      movingSignal.reset(50);
      assert.equal(movingSignal.getValue(151), 10);
    });

    it('should return correct scaled value for positive range', () => {
      const movingSignal = new signal.MovingSignalGenerator(0, 10, 100);
      movingSignal.reset(50);
      assert.equal(movingSignal.getValue(100), 5);
    });

    it('should return correct scaled value for negative range', () => {
      const movingSignal = new signal.MovingSignalGenerator(10, 0, 100);
      movingSignal.reset(50);
      assert.equal(movingSignal.getValue(100), 5);
    });

    it('should return correct scaled value for negative values', () => {
      const movingSignal = new signal.MovingSignalGenerator(-100, 0, 100);
      movingSignal.reset(0);
      assert.equal(movingSignal.getValue(50), -50);
    });

    it('should return correct scaled value for negative values and negative range', () => {
      const movingSignal = new signal.MovingSignalGenerator(0, -100, 100);
      movingSignal.reset(0);
      assert.equal(movingSignal.getValue(50), -50);
    });
  });

  describe('ScheduleSignalGenerator', () => {
    it('should decide from two constant signals correctly', () => {
      const scheduleSignal = new signal.ScheduleSignalGenerator([{
        text: 'after 00:00 before 12:00',
        signalGenerator: new signal.ConstantSignalGenerator(1)
      }, {
        text: 'after 12:00 before 24:00',
        signalGenerator: new signal.ConstantSignalGenerator(2)
      }]);

      assert(scheduleSignal.getValue(+new Date('2017-01-01T00:00:00Z')), 1);
      assert(scheduleSignal.getValue(+new Date('2017-01-01T08:00:00Z')), 1);
      assert(scheduleSignal.getValue(+new Date('2017-01-01T12:00:00Z')), 2);
      assert(scheduleSignal.getValue(+new Date('2017-01-01T23:59:00Z')), 2);
    });

    it('should use default signal generator if no schedule match', () => {
      const scheduleSignal = new signal.ScheduleSignalGenerator([{
        text: 'after 00:00 before 12:00',
        signalGenerator: new signal.ConstantSignalGenerator(1)
      }], new signal.ConstantSignalGenerator(0));

      assert.equal(scheduleSignal.getValue(+new Date('2017-01-01T22:00:00Z')), 0);
    });

    it('should use first matching schedule if there are overlaps', () => {
      const scheduleSignal = new signal.ScheduleSignalGenerator([{
        text: 'after 00:00 before 12:00',
        signalGenerator: new signal.ConstantSignalGenerator(1)
      }, {
        text: 'after 00:00 before 12:00',
        signalGenerator: new signal.ConstantSignalGenerator(2)
      }, {
        text: 'after 00:00 before 12:00',
        signalGenerator: new signal.ConstantSignalGenerator(3)
      }]);

      assert.equal(scheduleSignal.getValue(+new Date('2017-01-01T08:00:00Z')), 1);
    });
  })
});
