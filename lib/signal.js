const later = require('later');

class MovingSignalGenerator {
  constructor(startValue, endValue, duration) {
    this.startValue = startValue;
    this.endValue = endValue;
    this.valueRange = this.endValue - this.startValue;
    this.duration = duration;
    this.reset(+new Date());
  }

  reset(time) {
    this.startTime = time;
    this.endTime = this.startTime + this.duration;
  }

  getValue(time) {
    if (time < this.startTime) {
      return this.startValue;
    } else if (time > this.endTime) {
      return this.endValue;
    } else {
      return ((time - this.startTime) / this.duration) * this.valueRange + this.startValue;
    }
  }
}

class ConstantSignalGenerator {
  constructor(value) {
    this.value = value;
  }
  reset() {}
  getValue() {
    return this.value;
  }
}

class ScheduleSignalGenerator {
  constructor(schedules, defaultSignalGenerator = new ConstantSignalGenerator(0)) {
    this.defaultSignalGenerator = defaultSignalGenerator;
    this.schedules = schedules.map((schedule) => {
      return {
        scheduler: later.schedule(later.parse.text(schedule.text)),
        signalGenerator: schedule.signalGenerator
      };
    });

    this.currentSignalGenerator = defaultSignalGenerator;
  }
  reset() {}
  getValue(time) {
    const schedule = this.schedules
      .find((schedule) => schedule.scheduler.isValid(new Date(time)));

    const newSignalGenerator = schedule ? schedule.signalGenerator : this.defaultSignalGenerator;

    if (this.currentSignalGenerator !== newSignalGenerator) {
      this.currentSignalGenerator = newSignalGenerator;
      this.currentSignalGenerator.reset();
    }

    return this.currentSignalGenerator.getValue(time);
  }
}

module.exports = {
  ConstantSignalGenerator,
  MovingSignalGenerator,
  ScheduleSignalGenerator
};
