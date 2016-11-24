const server = require('./lib/server');
server.start();
const rpio = require('./lib/outs/outputs');
rpio.initialize();
