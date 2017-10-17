const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const publicDir = './public';
app.use(express.static(publicDir));
app.use(bodyParser.json());

const mountains = require('./routes/mountains');

//Question: why does this break if i add '/api/mountains' to argument?
app.use(mountains);

module.exports = app;