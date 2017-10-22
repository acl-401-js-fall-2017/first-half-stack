const express = require('express');
const path = require('path');  //eslint-disable-line
const app = express();
const bodyParser = require('body-parser');
const notFound = require('./utils/not-found');  //eslint-disable-line
const states = require('./routes/states');

app.use(bodyParser.json());
app.use('/api/states', states);



module.exports = app;

