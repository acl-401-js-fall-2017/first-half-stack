const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();

// const publicDir = './public';
// app.use(express.static(publicDir));
app.use(bodyParser.json());

const fruits = require('./routes/fruitsRouter');
app.use('./api/fruitsRouter', fruits);

module.exports = app;