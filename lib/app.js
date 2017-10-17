const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const publicDir = './public';
app.use(express.static(publicDir));

app.use(bodyParser.json());

const fruits = require('./routes/fruits');
app.use('/fruits', fruits);

module.exports = app;
