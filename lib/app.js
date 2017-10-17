const express = require('express');
// const path = require('path');
const app = express();

// const parseUrl = require('./utils/parse-url');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// const notFound = require('./utils/not-found');

const rodents = require('./routes/rodents');


app.use('/rodents', rodents);

module.exports = app;