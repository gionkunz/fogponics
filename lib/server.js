const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data').data;

const port = 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.route('/data/:outKey')
  .get((req, res) => res.json({ value: data[req.params.outKey] }))
  .put((req, res) => {
    data[req.params.outKey] = req.body.value;
    res.json({ message: 'Value updated!' });
  });

app.use('/api', apiRouter);

const start = () => {
  app.listen(port);
  console.log('RESTful API served on port ' + port);
};

module.exports = {
  app,
  start
};
