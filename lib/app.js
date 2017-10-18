const proteins = require('./routes/proteins');

const express = require('express');
const app = express();

const protPath = '/proteins';

app.use(protPath, proteins);

module.exports = app;