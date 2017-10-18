const bodyParser = require('body-parser');
const mountains = require('./routes/mountains');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.use('/mountains', mountains);

module.exports = app;

