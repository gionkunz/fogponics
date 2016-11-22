const rpio = require('rpio');

const ledPin = 12;
const ledClockDivider = 256;
//const fanPin = 7;

rpio.init({
  gpiomem: false
});

rpio.open(ledPin, rpio.PWM);
rpio.pwmSetClockDivider(ledClockDivider);
rpio.pwmSetRange(ledPin, 1024);

//rpio.open(fanPin, rpio.OUTPUT, rpio.LOW);

let counter = 0;
const interval = setInterval(() => {
  rpio.pwmSetData(ledPin, (counter++ % 1024));
  //rpio.write(fanPin, (counter % 50) > 25 ? rpio.HIGH : rpio.LOW);
  console.log('PWM: ' + counter % 1024);
}, 30);

function close() {
  rpio.open(ledPin, rpio.INPUT);
  //rpio.open(fanPin, rpio.INPUT);
  clearInterval(interval);
}

process.on('SIGINT', () => close());
