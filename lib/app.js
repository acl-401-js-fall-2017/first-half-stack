const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const publicDir = './public';
app.use(express.static(publicDir));
app.use(bodyParser.json());

const mountains = require('./routes/mountains');

app.use(mountains);

module.exports = app;