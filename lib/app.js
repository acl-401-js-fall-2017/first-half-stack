const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('./utils/body-parser');

const publicDir = './public';
app.use(express.static(publicDir));
app.use(bodyParser.json());

const altcoins = require('./routes/altcoins');
app.use('/api/altcoins', altcoins);

module.exports = app;
