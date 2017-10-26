const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const publicDir = './public';
app.use(express.static(publicDir));
app.use(bodyParser.json());

const altcoins = require('./routes/altcoins');
app.use('/altcoins', altcoins);

module.exports = app;
