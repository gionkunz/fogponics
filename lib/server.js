const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data').data;

const port = 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.route('/out/:outKey')
  .get((req, res) => res.json({ value: data[req.params.outKey] }))
  .put((req, res) => {
    data[req.params.outKey] = Math.max(0, Math.min(1024, Number(req.body.value)));
    res.json({ message: 'Value updated to ' + data[req.params.outKey] });
  });

app.use('/api', apiRouter);
app.use('/static', express.static('public'));

const start = () => {
  app.listen(port);
  console.log('Server started on port ' + port);
};

module.exports = {
  app,
  start
};
