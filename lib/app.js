const express = require('express');
// const path = require('path');
const app = express();
// const parseUrl = require('./utils/parse-url');
const bodyParser = require('body-parser');
// const notFound = require('./utils/not-found');

const publicDir = './public';
app.use(express.static(publicDir));
app.use(bodyParser.json());


const mountains = require('./routes/mountains');

app.use(mountains);

module.exports = app;