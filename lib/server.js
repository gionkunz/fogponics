const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const data = require('./data').data;
const signal = require('./signal');

const port = 80;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.route('/out/:outKey')
  .get((req, res) => res.json({ value: data[req.params.outKey] }))
  .put((req, res) => {
    data[req.params.outKey] = new signal.ConstantSignalGenerator(Math.max(0, Math.min(1024, Number(req.body.value))));
    res.json({ message: 'Value updated to ' + data[req.params.outKey].getValue() });
  });

app.use(express.static(path.resolve(path.join(__dirname, '../public'))));
app.use('/api', apiRouter);

const start = () => {
  app.listen(port);
  console.log('Server started on port ' + port);
};

module.exports = {
  app,
  start
};
