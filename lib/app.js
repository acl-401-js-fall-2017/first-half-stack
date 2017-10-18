const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const rodents = require('./routes/rodents');


app.use('/rodents', rodents);

module.exports = app;