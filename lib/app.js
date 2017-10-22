const express = require('express');
const path = require('path');  //eslint-disable-line
const app = express();
const bodyParser = require('body-parser');
const states = require('./routes/states');

app.use(bodyParser.json());
app.use('/api/states', states);



module.exports = app;

